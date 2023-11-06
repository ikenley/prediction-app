--
-- Add workflow_type column to auth.oauth_state
--

create type auth.workflow_type as enum (
    'login'
    , 'logout'
)
;

alter table auth.oauth_state 
add column workflow_type auth.workflow_type not null default 'login'
;
