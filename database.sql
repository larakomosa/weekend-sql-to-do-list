CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(250),
	"completed" boolean
);

INSERT INTO "tasks" ("task", "completed")
VALUES 
('Mow the Lawn', 'false'),
('Birthday Card for Grandma', 'false'),
('Feed Chickens', 'false'),
('100 Push Ups', 'true'),
('Rake Leaves', 'false'),
('Finish Prime Project', 'true')
