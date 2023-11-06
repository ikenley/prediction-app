--
-- Seed data for auth schema
--

INSERT INTO auth."user"
(id, first_name, last_name, email, created, last_accessed)
VALUES('5dedaffe-4463-45f3-9596-b05235ca5393', 'Dave', 'Bowman', 'dave.bowman@fake.net', now(), now());

INSERT INTO auth.oauth_state
(id, redirect_url, started_at, completed_at, user_id)
VALUES('a9a18718-c82e-4858-8ac1-f3d8c62d1138', '', now(), now(), '5dedaffe-4463-45f3-9596-b05235ca5393');

INSERT INTO auth.oauth_state
(id, redirect_url, started_at, completed_at, user_id)
VALUES('28983dd6-2d3b-48d1-af53-ead38fe273ba', '', now(), null, null);

