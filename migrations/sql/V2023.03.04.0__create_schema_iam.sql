--
-- Creates iam (Identity and Access Management) schema 
-- ... used for user and related metadata
--

create schema if not exists iam;

create role iam_reader;
create role iam_writer;

grant iam_reader to iam_writer;

grant usage on schema iam to iam_reader;

alter default privileges in schema iam grant select on tables to iam_reader;
alter default privileges grant usage, select on sequences to iam_reader;

alter default privileges in schema iam grant insert, update, delete on tables to iam_writer;