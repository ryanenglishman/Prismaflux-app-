import { generateImagePrompt } from "./prompt-generator";
import { generateImage } from "./image-generator";
import { generatePinterestContent } from "./content-generator";
import { generateLinkedInContent } from "./linkedin-generator";
import { createPin, buildPinPayload } from "./pinterest-client";
import { sendNotification } from "./notifier";
import type { PipelineResult } from "./types";

export async function runPinterestPipeline(): Promise<PipelineResult> {
  const start = Date.now();

  const boardId = process.env.PINTEREST_BOARD_ID;
  if (!boardId) {
    return {
      success: false,
      error: "PINTEREST_BOARD_ID manquant",
      durationMs: Date.now() - start,
    };
  }
  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      error: "OPENAI_API_KEY manquant",
      durationMs: Date.now() - start,
    };
  }
  if (!process.env.PINTEREST_ACCESS_TOKEN) {
    return {
      success: false,
      error: "PINTEREST_ACCESS_TOKEN manquant",
      durationMs: Date.now() - start,
    };
  }

  try {
    // Step 1: Generate a creative image prompt
    const prompt = await generateImagePrompt();

    // Step 2+3+4: Generate image, Pinterest content AND LinkedIn in parallel
    const [image, content, linkedin] = await Promise.all([
      generateImage(prompt.imagePrompt),
      generatePinterestContent(prompt.imagePrompt, prompt.theme),
      generateLinkedInContent(prompt.imagePrompt, prompt.theme),
    ]);

    // Step 5: Post to Pinterest
    const payload = buildPinPayload(
      image.base64Data,
      image.contentType,
      content.title,
      content.description,
      content.altText,
      boardId,
      "https://auto-prismaflux.com",
    );
    const pin = await createPin(payload);

    const result: PipelineResult = {
      success: true,
      prompt,
      content,
      linkedin,
      pin,
      durationMs: Date.now() - start,
    };

    await sendNotification(result);
    return result;
  } catch (err) {
    const result: PipelineResult = {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - start,
    };

    await sendNotification(result);
    return result;
  }
}
