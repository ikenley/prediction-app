
-- Import raw CSV files from S3 into base tables
-- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Procedural.Importing.html

CREATE extension if not exists aws_s3 CASCADE;

CREATE schema if not exists base;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- foo

drop table if exists base.foo;

CREATE TABLE base.foo (
	id int,
	name text null
);

SELECT aws_s3.table_import_from_s3(
   'base.foo',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('1234567890-data-lake', 'prediction-app/base/foo/foo.csv', 'us-east-1')
);

select *
from base.foo
limit 100
;
