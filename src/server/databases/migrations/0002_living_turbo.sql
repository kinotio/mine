CREATE TABLE "profile_section_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"description" text,
	"color" varchar(256),
	"icon" varchar(256),
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_section_templates_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_profile_section_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_profile_id" uuid NOT NULL,
	"user_profile_section_id" uuid NOT NULL,
	"metadata" jsonb,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"user_profile_id" uuid NOT NULL,
	"profile_section_template_id" uuid NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_sections_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "files" RENAME TO "user_profile_files";--> statement-breakpoint
ALTER TABLE "profiles" RENAME TO "user_profiles";--> statement-breakpoint
ALTER TABLE "user_profile_files" RENAME COLUMN "profile_id" TO "user_profile_id";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP CONSTRAINT "profiles_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_profile_files" DROP CONSTRAINT "files_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profiles" DROP CONSTRAINT "profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profile_section_items" ADD CONSTRAINT "user_profile_section_items_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_section_items" ADD CONSTRAINT "user_profile_section_items_user_profile_section_id_user_profile_sections_id_fk" FOREIGN KEY ("user_profile_section_id") REFERENCES "public"."user_profile_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_sections" ADD CONSTRAINT "user_profile_sections_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_sections" ADD CONSTRAINT "user_profile_sections_profile_section_template_id_profile_section_templates_id_fk" FOREIGN KEY ("profile_section_template_id") REFERENCES "public"."profile_section_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_files" ADD CONSTRAINT "user_profile_files_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id");