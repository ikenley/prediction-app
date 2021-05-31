
-- Publish staging tables to public app-facing version

-------------------------------------------------------------------------------
-- foo

-- schema is maanged by Entity Framework Migration
truncate table public.foo;

insert into public.foo
select id
	, "name"
from staging.foo b
;

CLUSTER public.foo USING pk_foo;

select *
from public.foo
limit 100
;

-------------------------------------------------------------------------------
-- Access

REASSIGN OWNED BY rds_admin TO public_admin;

--ACCESS SCHEMA
--REVOKE ALL     ON SCHEMA public FROM PUBLIC;
GRANT  USAGE ON SCHEMA public  TO public_admin;
--ACCESS TABLES
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC ;
GRANT all ON ALL TABLES IN SCHEMA public TO public_admin ;