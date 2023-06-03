--
-- Seed data for sharing
--

INSERT INTO prediction.prediction
(id, user_id, "name", probability, revisit_on, is_true, description, created_on, last_updated, can_share)
select 'c5695d7f-1edd-4731-ba08-ddcc3a2dc946' as id 
	, '12345' as user_id 
	, 'Shared with Me' as "name" 
	, 0.5 as probability 
	, now() + INTERVAL '7 day' as revisit_on 
	, cast(null as boolean) as is_true 
	, 'Lorem ipsum dolor' as description 
	, now() as created_on 
	, now() as last_updated 
	, true as can_share
;

