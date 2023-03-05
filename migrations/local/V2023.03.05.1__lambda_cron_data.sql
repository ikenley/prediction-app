--
-- Seed data for revisit_prediction_function "cron job"
--

INSERT INTO prediction.prediction
(id, user_id, "name", probability, revisit_on, is_true, description, created_on, last_updated)
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'CRON prediction ABC' as "name" 
	, 0.25 as probability 
	, date_trunc('day', now()) as revisit_on 
	, cast(null as boolean) as is_true 
	, 'Lorem ipsum dolor' as description 
	, now() as created_on 
	, now() as last_updated 
union
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'CRON prediction XYZ' as "name" 
	, 0.50 as probability 
	, date_trunc('day', now()) as revisit_on 
	, cast(null as boolean) as is_true 
	, 'sit amet, consectetur adipiscing elit' as description 
	, now() as created_on 
	, now() as last_updated  
;
