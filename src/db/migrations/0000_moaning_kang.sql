CREATE TABLE "cylinder_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_response" text,
	"cylinder_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cylinder" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"img_id" text,
	"description" text,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cylinder_log" ADD CONSTRAINT "cylinder_log_cylinder_id_cylinder_id_fk" FOREIGN KEY ("cylinder_id") REFERENCES "public"."cylinder"("id") ON DELETE no action ON UPDATE no action;