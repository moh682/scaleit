CREATE INDEX `email_idx` ON `scaleit_user` (`email`);--> statement-breakpoint
ALTER TABLE `scaleit_user` ADD CONSTRAINT `id_idx` UNIQUE(`id`);