
-- Calculate staging tables and populate public tables

CREATE schema if not exists staging;

-------------------------------------------------------------------------------
-- foo

drop table if exists staging.foo;

CREATE TABLE staging.foo (
	id int4 NOT NULL,
	name varchar(50)
	CONSTRAINT pk_foo PRIMARY KEY (id)
);

insert into staging.foo
select id
	, name
from base.foo b
;

CLUSTER staging.foo USING pk_foo;

select *
from staging.foo
limit 100
;
