--
-- Creates initial prediction tables
--

--
-- enable uuid
--

create extension if not exists "uuid-ossp";

--
--
--

create schema if not exists prediction;

create table prediction.prediction (
    id uuid,
    user_id varchar(36),
    "name" varchar,
    probability float,
    revisit_on timestamp not null default now(),
    is_true boolean null,
    description varchar,
    created_on timestamp not null default now(),
    last_updated timestamp not null default now(),
    constraint pk_prediction_prediction primary key (id),
    constraint fk_prediction_user foreign key (user_id) references iam.user(id)
);

create index prediction_prediction_ix on prediction.prediction(id);

--
-- Permissions
--

create role prediction_reader;
create role prediction_writer;

grant prediction_reader to prediction_writer;

grant usage on schema prediction to prediction_reader;

alter default privileges in schema prediction grant select on tables to prediction_reader;
alter default privileges grant usage, select on sequences to prediction_reader;

alter default privileges in schema prediction grant insert, update, delete on tables to prediction_writer;

--
-- Group assignments
--

grant prediction_writer to prediction_app_user;