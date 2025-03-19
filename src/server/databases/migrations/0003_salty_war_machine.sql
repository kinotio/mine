ALTER TABLE "user_profile_section_items" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile_sections" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;