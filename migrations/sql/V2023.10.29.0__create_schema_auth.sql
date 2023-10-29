--
-- Creates auth schema for auth service
--

create schema if not exists auth;

create role auth_reader;
create role auth_writer;

grant auth_reader to auth_writer;

grant usage on schema auth to auth_reader;

alter default privileges in schema auth grant select on tables to auth_reader;
alter default privileges grant usage, select on sequences to auth_reader;

alter default privileges in schema auth grant insert, update, delete on tables to auth_writer;

--
-- auth.user
--

create table auth.user (
    id uuid not null,
    first_name varchar,
    last_name varchar,
    email varchar,
    created timestamp not null default now(),
    last_accessed timestamp not null default now(),
    constraint pk_auth_user primary key (id)
);

--
-- auth.oauth_state
--

create table auth.oauth_state (
    id uuid not null,
    redirect_url varchar,
    started_at timestamp not null default now(),
    completed_at timestamp null,
    user_id uuid null,
    constraint pk_auth_oauth_state primary key (id)
);
