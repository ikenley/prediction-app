--
-- Seed data for local development
--

INSERT INTO iam."user"
(id, first_name, last_name, email, created, last_accessed)
VALUES('${USER_ID}', 'Test', 'User', 'test_user@example.com', now(), now());

--
--
--

INSERT INTO prediction.prediction
(id, user_id, "name", probability, revisit_on, is_true, description, created_on, last_updated)
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'Prediction ABC' as "name" 
	, 0.25 as probability 
	, now() + INTERVAL '7 day' as revisit_on 
	, cast(null as boolean) as is_true 
	, 'Lorem ipsum dolor' as description 
	, now() as created_on 
	, now() as last_updated 
union
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'Prediction DEF' as "name" 
	, 0.50 as probability 
	, now() + INTERVAL '14 day' as revisit_on 
	, cast(null as boolean) as is_true 
	, 'sit amet, consectetur adipiscing elit' as description 
	, now() as created_on 
	, now() as last_updated 
union
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'Prediction XYZ' as "name" 
	, 0.75 as probability 
	, now() + INTERVAL '27 day' as revisit_on 
	, null as is_true 
	, 'Nam posuere neque in mauris pulvinar consectetur id' as description 
	, now() as created_on 
	, now() as last_updated 
union
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'Historical prediction QRS' as "name" 
	, 0.10 as probability 
	, now() + INTERVAL '-7 day' as revisit_on 
	, false as is_true 
	, 'Quisque at vulputate enim, in luctus quam.' as description 
	, now() + INTERVAL '-27 day' as created_on 
	, now() as last_updated 
union
select uuid_generate_v4() as id 
	, '${USER_ID}' as user_id 
	, 'Historical prediction ABC' as "name" 
	, 0.90 as probability 
	, now() + INTERVAL '-27 day' as revisit_on 
	, true as is_true 
	, 'Donec hendrerit tellus nibh, pretium vehicula nisi condimentum in.' as description 
	, now() + INTERVAL '-39 day' as created_on 
	, now() as last_updated 
;
