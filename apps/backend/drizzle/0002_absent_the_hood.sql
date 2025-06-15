DROP POLICY "Users can update own learning profile." ON "learning_profiles" CASCADE;--> statement-breakpoint
DROP POLICY "Users can insert their own learning profile." ON "learning_profiles" CASCADE;--> statement-breakpoint
DROP POLICY "Public learning profiles are viewable by everyone." ON "learning_profiles" CASCADE;--> statement-breakpoint
DROP TABLE "learning_profiles" CASCADE;--> statement-breakpoint
DROP POLICY "Individuals can view their own logs." ON "word_learning_logs" CASCADE;--> statement-breakpoint
DROP POLICY "Individuals can update their own logs." ON "word_learning_logs" CASCADE;--> statement-breakpoint
DROP POLICY "Individuals can create logs." ON "word_learning_logs" CASCADE;--> statement-breakpoint
DROP TABLE "word_learning_logs" CASCADE;