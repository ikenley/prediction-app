--
-- Creates initial iam tables
--

create table iam.user (
    id varchar(36),
    first_name varchar,
    last_name varchar,
    email varchar,
    created timestamp not null default now(),
    last_accessed timestamp not null default now(),
    constraint pk_iam_user primary key (id)
);

