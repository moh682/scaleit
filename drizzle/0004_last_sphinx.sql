ALTER TABLE `scaleit_user` ADD `firstname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleit_user` ADD `lastname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleit_user` ADD `email_verified_at` timestamp;--> statement-breakpoint
ALTER TABLE `scaleit_user` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `scaleit_user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `scaleit_user` ADD CONSTRAINT `scaleit_user_email_unique` UNIQUE(`email`);