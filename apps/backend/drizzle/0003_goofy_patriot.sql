CREATE TABLE "word_learning_logs" (
	"word_id" uuid,
	"user_id" text,
	"due" timestamp with time zone NOT NULL,
	"stability" real NOT NULL,
	"difficulty" real NOT NULL,
	"elapsed_days" integer NOT NULL,
	"scheduled_days" integer NOT NULL,
	"reps" integer NOT NULL,
	"lapses" integer NOT NULL,
	"state" "fsrs_card_state" NOT NULL,
	"last_review" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	CONSTRAINT "word_learning_logs_word_id_user_id_pk" PRIMARY KEY("word_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "word_learning_logs" ADD CONSTRAINT "word_learning_logs_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_learning_logs" ADD CONSTRAINT "word_learning_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;