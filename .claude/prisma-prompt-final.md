# Prompt Prisma Final — PrismaFlux Auto
# Coller ce prompt dans Claude Code après avoir initialisé le projet Next.js

---

## PROMPT A COLLER DANS CLAUDE CODE :

```
Create a complete Prisma schema for a multi-tenant B2B SaaS called PrismaFlux Auto.
Use PostgreSQL. Use uuid for all IDs (@default(uuid())). Add @updatedAt where relevant.
Add proper indexes on all FK fields and on organizationId wherever it appears.

===== ENUMS =====

enum UserTier {
  PRIMARY_ADMIN
  CO_ADMIN
  EMPLOYEE
}

enum VehicleStatus {
  DRAFT
  ACTIVE
  SOLD
  ARCHIVED
}

enum ListingStatus {
  PENDING
  ACTIVE
  REJECTED
  EXPIRED
}

enum PlatformSlug {
  PRISMAFLUX_CATALOG
  AUTOSCOUT24
  AUTOSCOUT24_BE
  GOCAR
  DEALERSHIP_WEBSITE
  LA_CENTRALE
  MOBILE_DE
  TWOEMEHANDS
  CARCHECK
}

enum ReportType {
  PLATFORMS_DETECTED
  LISTING_AUDIT
  REPUTATION_ANALYSIS
}

enum SubscriptionPlan {
  ESSENTIEL
  ACCELERATION
  REPUTATION
  MAITRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
}

enum CopiloteName {
  ROBIN
  PIERRE
  MARCUS
  BEN
  LANA
  MAYA
}

enum LanaMode {
  BASIC
  PERFORMANCE
}

enum PhotoProcessingStatus {
  PENDING
  PROCESSING
  DONE
  FAILED
}

enum PhotoPart {
  EXTERIOR
  INTERIOR
  DETAIL
  OTHER
}

enum HealthCheckType {
  CONNECTIVITY
  RATE_LIMIT
  FIELD_REJECTION
  AUTH_EXPIRY
}

enum HealthStatus {
  OK
  WARNING
  BLOCKED
}

enum ClipDuration {
  THIRTY_SEC
  FORTY_FIVE_SEC
  SIXTY_SEC
}

enum ClipStatus {
  DRAFT
  SUBMITTED
  IN_PRODUCTION
  REVIEW
  DELIVERED
  ARCHIVED
}

enum AssetType {
  INSPIRATION
  VEHICLE_PHOTO
  LOGO
  MUSIC_REF
  OTHER
}

enum LeadSource {
  PHONE
  EMAIL
  FORM
  CHAT
  WALKIN
  OTHER
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  NEGOTIATION
  WON
  LOST
}

enum LeadTemperature {
  HOT
  WARM
  COLD
}

enum BenSessionType {
  RESPONSE_DRAFT
  FOLLOWUP
  OBJECTION
  CLOSING
  DEBRIEF
}

enum CallDirection {
  INBOUND
  OUTBOUND
}

enum CallLogStatus {
  PENDING
  ANALYZED
  ARCHIVED
}

enum SiteQualityTier {
  NONE
  LOW
  MEDIUM
  HIGH
}

enum RecommendationLevel {
  CONNECT
  IMPROVE
  REBUILD
  CREATE
}

enum WebsiteConnectionType {
  PRISMAFLUX_BUILT
  EXTERNAL
}

enum ConnectionStatus {
  PENDING
  CONNECTED
  FAILED
  DISCONNECTED
}

enum SocialPlatform {
  FACEBOOK
  INSTAGRAM
  X
  LINKEDIN
  TIKTOK
}

enum SocialPostStatus {
  DRAFT
  SCHEDULED
  PUBLISHED
  FAILED
}

enum LogoPosition {
  TOP_LEFT
  TOP_RIGHT
  BOTTOM_LEFT
  BOTTOM_RIGHT
}

enum OutputFormat {
  JPEG
  PNG
  WEBP
}

===== TABLE 1 — Network =====
Group of dealerships.
Fields: id, name, createdAt

===== TABLE 2 — Organization =====
Individual dealership.
Fields: id, name, siret (String, unique), address, city, country, phone,
  publicSlug (String, unique — ex: "garage-dupont-lyon"),
  catalogIsPublic (Boolean, default true),
  catalogDescription (Text, nullable),
  networkId (optional FK to Network),
  createdAt

===== TABLE 3 — User =====
Dealership employee.
Fields: id, email (String, unique), name,
  organizationId (FK to Organization),
  supabaseUserId (String, unique),
  createdAt

===== TABLE 4 — UserRole =====
Hierarchical permission tier per user.
Fields: id, userId (FK to User), organizationId (FK to Organization),
  tier (UserTier enum),
  isPrimaryAdmin (Boolean, default false — unique true per org),
  grantedBy (FK to User, nullable for PRIMARY_ADMIN),
  createdAt

===== TABLE 5 — PermissionSet =====
Restrictions defined per user by their superior.
Fields: id, userId (FK to User, unique), organizationId (FK to Organization),
  grantedBy (FK to User),
  canManageVehicles (Boolean, default true),
  canPublishListings (Boolean, default true),
  canViewReports (Boolean, default true),
  canManageTeam (Boolean, default false),
  canAccessStudio (Boolean, default true),
  canConnectPlatforms (Boolean, default false),
  canViewFinance (Boolean, default false),
  canViewPlatformHealth (Boolean, default true),
  canRunHealthCheck (Boolean, default false),
  canManageTeamPermissions (Boolean, default false),
  canOrderAdClips (Boolean, default false),
  customRestrictions (Json, nullable — for future granular rules),
  createdAt, updatedAt

===== TABLE 6 — Platform =====
External listing platform.
Fields: id, slug (PlatformSlug enum, unique),
  name (String — display name ex: "AutoScout24"),
  isAvailable (Boolean, default false),
  requiresDevis (Boolean, default false),
  launchPhase (String, default "1"),
  monthlyPrice (Decimal, default 0),
  discountedPrice (Decimal, nullable),
  discountCondition (String, nullable — ex: "Site concu par PrismaFlux"),
  createdAt

Seed values:
  PRISMAFLUX_CATALOG  → isAvailable: true,  monthlyPrice: 0,   requiresDevis: false
  AUTOSCOUT24         → isAvailable: true,  monthlyPrice: 0,   requiresDevis: false
  GOCAR               → isAvailable: true,  monthlyPrice: 0,   requiresDevis: false
  AUTOSCOUT24_BE      → isAvailable: false, monthlyPrice: 299,  requiresDevis: false
  LA_CENTRALE         → isAvailable: false, monthlyPrice: 399,  requiresDevis: false
  TWOEMEHANDS         → isAvailable: false, monthlyPrice: 349,  requiresDevis: false
  MOBILE_DE           → isAvailable: false, monthlyPrice: 899,  requiresDevis: false
  DEALERSHIP_WEBSITE  → isAvailable: true,  monthlyPrice: 399, discountedPrice: 299,
                         discountCondition: "Site concu par PrismaFlux", requiresDevis: true
  CARCHECK            → isAvailable: false, monthlyPrice: 0,   requiresDevis: false

===== TABLE 7 — OrganizationPlatform =====
Junction: org connected to platform.
Fields: id, organizationId (FK), platformId (FK),
  isConnected (Boolean, default false),
  apiKey (String, nullable — encrypted),
  stripeSubscriptionItemId (String, nullable),
  appliedPrice (Decimal, default 0),
  discountApplied (Boolean, default false),
  discountReason (String, nullable),
  connectedAt (DateTime, nullable)
Unique constraint on [organizationId, platformId].

===== TABLE 8 — Vehicle =====
Vehicle record.
Fields: id, organizationId (FK),
  make (String), model (String), year (Int), mileage (Int),
  price (Decimal), fuelType (String), transmission (String),
  color (String, nullable), bodyType (String, nullable),
  description (Text, nullable),
  seoDescription (Text, nullable — generated by Robin),
  status (VehicleStatus, default DRAFT),
  createdAt, updatedAt

===== TABLE 9 — VehiclePhoto =====
Photos uploaded per vehicle.
Fields: id, vehicleId (FK to Vehicle),
  originalUrl (String — Supabase Storage),
  processedUrl (String, nullable — after Studio processing),
  processingStatus (PhotoProcessingStatus, default PENDING),
  detectedColor (String, nullable — AI result),
  detectedPart (PhotoPart, default OTHER),
  isMain (Boolean, default false),
  studioConfig (Json, nullable — stores applied effects),
  uploadedAt (DateTime, default now), processedAt (DateTime, nullable)

===== TABLE 10 — StudioConfig =====
Reusable Lana Basic config per organization.
Fields: id, organizationId (FK to Organization, unique),
  logoUrl (String, nullable — concession watermark),
  logoPosition (LogoPosition, default BOTTOM_RIGHT),
  autoRemoveBackground (Boolean, default true),
  autoRemoveReflections (Boolean, default true),
  autoDropShadow (Boolean, default true),
  virtualStagingEnabled (Boolean, default false),
  outputFormat (OutputFormat, default JPEG),
  createdAt, updatedAt

===== TABLE 11 — Listing =====
Diffusion of a vehicle on one platform.
Fields: id, vehicleId (FK to Vehicle), platformId (FK to Platform),
  externalId (String, nullable — platform's own ID),
  status (ListingStatus, default PENDING),
  publishedAt (DateTime, nullable),
  lastSyncAt (DateTime, nullable),
  errorMessage (String, nullable),
  createdAt

===== TABLE 12 — PlatformHealthCheck =====
Anti-blocking monitoring.
Fields: id, organizationId (FK), platformId (FK),
  checkType (HealthCheckType),
  status (HealthStatus, default OK),
  detectedIssue (String, nullable),
  suggestedFix (String, nullable),
  checkedAt (DateTime, default now)

===== TABLE 13 — CopiloteSession =====
AI interaction log for Robin and other copilots.
Fields: id, organizationId (FK), userId (FK to User),
  copilote (CopiloteName),
  lanaMode (LanaMode, nullable — only for LANA copilot),
  inputPrompt (Text),
  outputResult (Text),
  vehicleId (FK to Vehicle, nullable),
  tokensUsed (Int, default 0),
  createdAt

===== TABLE 14 — Report =====
Pierre copilot reports (permanent in dealership profile).
Fields: id, organizationId (FK),
  type (ReportType),
  title (String),
  content (Json — structured findings),
  generatedAt (DateTime, default now),
  isRead (Boolean, default false),
  createdAt

===== TABLE 15 — ReputationSnapshot =====
Reputation state captured by Pierre's web agent.
Fields: id, organizationId (FK),
  platformName (String — ex: "Google", "AutoScout24", "Facebook"),
  overallScore (Decimal, nullable),
  reviewCount (Int, default 0),
  sentimentScore (Decimal, nullable — -1.0 to 1.0),
  sourceUrl (String, nullable),
  capturedAt (DateTime, default now)

===== TABLE 16 — Subscription =====
Active plan.
Fields: id, organizationId (FK to Organization, unique),
  plan (SubscriptionPlan, default ESSENTIEL),
  stripeSubscriptionId (String, nullable),
  stripeCustomerId (String, nullable),
  status (SubscriptionStatus, default ACTIVE),
  lanaEnabled (Boolean, default false — Lana Performance 449€/mois),
  lanaStripeItemId (String, nullable),
  currentPeriodStart (DateTime),
  currentPeriodEnd (DateTime),
  createdAt, updatedAt

===== TABLE 17 — AdClipOrder =====
Advertising clip orders.
Fields: id, organizationId (FK), userId (FK to User),
  duration (ClipDuration),
  price (Decimal — 850 / 1150 / 1500),
  status (ClipStatus, default DRAFT),
  title (String),
  brief (Text),
  targetAudience (String, nullable),
  toneStyle (String, nullable),
  stripePaymentIntentId (String, nullable),
  paidAt (DateTime, nullable),
  deliveredAt (DateTime, nullable),
  deliveryUrl (String, nullable),
  feedback (Text, nullable),
  createdAt, updatedAt

===== TABLE 18 — AdClipAsset =====
Files attached to clip orders.
Fields: id, orderId (FK to AdClipOrder),
  assetType (AssetType),
  url (String — Supabase Storage),
  filename (String),
  uploadedAt (DateTime, default now)

===== TABLE 19 — AdClipRevision =====
Revision history for delivered clips.
Fields: id, orderId (FK to AdClipOrder),
  version (Int),
  videoUrl (String),
  notes (Text, nullable),
  isApproved (Boolean, default false),
  createdAt

===== TABLE 20 — Lead =====
Incoming prospect (for Ben).
Fields: id, organizationId (FK), userId (FK to User — assigned vendor),
  source (LeadSource),
  firstName (String), lastName (String),
  email (String, nullable), phone (String, nullable),
  vehicleInterestId (FK to Vehicle, nullable),
  status (LeadStatus, default NEW),
  temperature (LeadTemperature, default WARM),
  notes (Text, nullable),
  createdAt, updatedAt

===== TABLE 21 — BenSession =====
Ben coach interaction with salesperson.
Fields: id, organizationId (FK), userId (FK to User),
  leadId (FK to Lead, nullable),
  sessionType (BenSessionType),
  inputContext (Text),
  benSuggestion (Text),
  wasUsed (Boolean, default false),
  vendeurFeedback (String, nullable),
  tokensUsed (Int, default 0),
  createdAt

===== TABLE 22 — PhoneCallLog =====
Preparation for future phone agent integration.
Fields: id, organizationId (FK), userId (FK to User),
  leadId (FK to Lead, nullable),
  callDirection (CallDirection),
  durationSeconds (Int, nullable),
  recordingUrl (String, nullable),
  transcriptText (Text, nullable),
  benAnalysis (Json, nullable — sentiments, signals),
  status (CallLogStatus, default PENDING),
  calledAt (DateTime), createdAt

===== TABLE 23 — WebsiteAudit =====
Marcus report generated at onboarding.
Fields: id, organizationId (FK),
  websiteUrl (String, nullable),
  siteDetected (Boolean, default false),
  siteQualityScore (Int, nullable — 0 to 100),
  qualityTier (SiteQualityTier, default NONE),
  findings (Json, nullable),
  hasCatalogSync (Boolean, default false),
  hasContactForm (Boolean, default false),
  hasMobileVersion (Boolean, default false),
  hasSSL (Boolean, default false),
  pageSpeedScore (Int, nullable),
  seoScore (Int, nullable),
  localSeoScore (Int, nullable — 0 to 100),
  detectedCity (String, nullable),
  targetKeywords (Json, nullable — local search queries to target),
  missingKeywords (Json, nullable — queries absent from current site),
  existingKeywords (Json, nullable — queries already present),
  googleBusinessDetected (Boolean, default false),
  googleBusinessScore (Int, nullable),
  localLandingPagesCount (Int, default 0),
  recommendedLandingPages (Json, nullable — pages to create with target keywords),
  recommendationLevel (RecommendationLevel, default CREATE),
  ctaShown (String, nullable),
  reportGeneratedAt (DateTime, default now),
  isRead (Boolean, default false),
  createdAt

===== TABLE 24 — WebsiteConnection =====
Link between app and dealership website.
Fields: id, organizationId (FK),
  siteUrl (String),
  connectionStatus (ConnectionStatus, default PENDING),
  connectionType (WebsiteConnectionType),
  catalogSyncActive (Boolean, default false),
  lastSyncAt (DateTime, nullable),
  connectedAt (DateTime, nullable),
  createdAt

===== TABLE 25 — SocialPost =====
Content generated by Lana Performance for social media.
Fields: id, organizationId (FK), vehicleId (FK to Vehicle),
  platform (SocialPlatform),
  contentText (Text),
  hashtags (String[]),
  mediaUrls (String[] — selected from VehiclePhoto),
  status (SocialPostStatus, default DRAFT),
  scheduledAt (DateTime, nullable),
  publishedAt (DateTime, nullable),
  externalPostId (String, nullable),
  engagementData (Json, nullable — likes, reach, clicks),
  createdAt, updatedAt

===== TABLE 26 — SocialAccount =====
Social media account connected by dealership.
Fields: id, organizationId (FK),
  platform (SocialPlatform),
  accountName (String),
  accessToken (String — encrypted),
  tokenExpiresAt (DateTime, nullable),
  isActive (Boolean, default true),
  connectedAt (DateTime, default now)
Unique constraint on [organizationId, platform].

===== TABLE 27 — LanaSession =====
Lana AI generation log (both Basic and Performance modes).
Fields: id, organizationId (FK), vehicleId (FK to Vehicle),
  lanaMode (LanaMode),
  inputData (Json — vehicle photos for BASIC, fiche + platforms for PERFORMANCE),
  outputData (Json — processed URLs for BASIC, captions for PERFORMANCE),
  selectedPlatforms (String[], nullable — only for PERFORMANCE),
  tokensUsed (Int, default 0),
  createdAt

===== RELATIONS SUMMARY =====
- Network 1:N Organization
- Organization 1:N User, Vehicle, Report, ReputationSnapshot, Lead, AdClipOrder,
  BenSession, PhoneCallLog, WebsiteAudit, WebsiteConnection, SocialPost,
  SocialAccount, LanaSession, CopiloteSession, PlatformHealthCheck
- Organization 1:1 Subscription, StudioConfig
- Organization N:M Platform through OrganizationPlatform
- User 1:1 UserRole, PermissionSet
- Vehicle 1:N VehiclePhoto, Listing, SocialPost, LanaSession
- Vehicle 1:N Lead (vehicleInterestId)
- AdClipOrder 1:N AdClipAsset, AdClipRevision
- Lead 1:N BenSession, PhoneCallLog
- Platform 1:N Listing, PlatformHealthCheck

===== INDEXES =====
Add indexes on: organizationId (every table that has it),
vehicleId (Listing, VehiclePhoto, SocialPost, LanaSession),
platformId (Listing, OrganizationPlatform, PlatformHealthCheck),
userId (UserRole, PermissionSet, BenSession, Lead, CopiloteSession),
leadId (BenSession, PhoneCallLog),
orderId (AdClipAsset, AdClipRevision),
status fields on Vehicle, Listing, Lead, SocialPost, AdClipOrder.

Generate the complete schema.prisma file with all models, enums, relations,
and indexes. Use the Prisma PostgreSQL provider with the DATABASE_URL
environment variable.
```
