--
-- Seed data for sharing
--

INSERT INTO iam."user"
(id, first_name, last_name, email, created, last_accessed)
VALUES('12345', 'Dave', 'Bowman', 'dave_bowman@example.com', now(), now());

INSERT INTO iam."user"
(id, first_name, last_name, email, created, last_accessed)
VALUES('67890', 'Frank', 'Poole', 'frank_poole@example.com', now(), now());

--
--
--

INSERT INTO prediction.prediction
(id, user_id, "name", probability, revisit_on, is_true, description, created_on, last_updated, can_share)
select 'ada0e89b-5318-4e03-893c-0e61cf0e3c0d' as id 
	, '${USER_ID}' as user_id 
	, 'Shared Prediction' as "name" 
	, 0.5 as probability 
	, now() + INTERVAL '7 day' as revisit_on 
	, cast(null as boolean) as is_true 
	, 'Lorem ipsum dolor' as description 
	, now() as created_on 
	, now() as last_updated 
	, true as can_share
;

--
--
--

INSERT INTO prediction.shared_prediction
(prediction_id, user_id, probability, created_on, last_updated)
select cast ('ada0e89b-5318-4e03-893c-0e61cf0e3c0d' as uuid) as prediction_id
	, '12345' as user_id 
	, 0.25 as probability
	, now() as created_on 
	, now() as last_updated 
union select 'ada0e89b-5318-4e03-893c-0e61cf0e3c0d' as prediction_id
	, '67890' as user_id 
	, 0.75 as probability
	, now() as created_on 
	, now() as last_updated 
;
