import { NextResponse } from "next/server";
import { generateImagePrompt } from "@/lib/marketing/pinterest/prompt-generator";
import { generateImage } from "@/lib/marketing/pinterest/image-generator";
import { generatePinterestContent } from "@/lib/marketing/pinterest/content-generator";

export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY manquant" },
      { status: 500 },
    );
  }

  const start = Date.now();

  try {
    const prompt = await generateImagePrompt();

    const [image, content] = await Promise.all([
      generateImage(prompt.imagePrompt),
      generatePinterestContent(prompt.imagePrompt, prompt.theme),
    ]);

    return NextResponse.json({
      success: true,
      prompt,
      content,
      imagePreview: `data:${image.contentType};base64,${image.base64Data.slice(0, 100)}...`,
      imageSizeBytes: Math.round((image.base64Data.length * 3) / 4),
      durationMs: Date.now() - start,
      note: "Mode test : l'image n'a PAS ete publiee sur Pinterest.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: Date.now() - start,
      },
      { status: 500 },
    );
  }
}
