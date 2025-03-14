CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"file_name" varchar(256) NOT NULL,
	"file_url" text NOT NULL,
	"file_type" varchar(256) NOT NULL,
	"file_size" varchar(256) NOT NULL,
	"tags" varchar(256) NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"profile_url" varchar(256) NOT NULL,
	"avatar_url" text,
	"banner_url" text,
	"name" varchar(256) NOT NULL,
	"title" varchar(256),
	"location" varchar(256),
	"bio" varchar(256),
	"email" varchar(256),
	"website" varchar(256),
	"github" varchar(256),
	"x" varchar(256),
	"linkedin" varchar(256),
	"bluesky" varchar(256),
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"image_url" varchar(256),
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;