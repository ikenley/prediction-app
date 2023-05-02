--
-- shared_prediction table
--

create table prediction.shared_prediction (
    prediction_id uuid,
    user_id varchar(36),
    probability float,
    created_on timestamp not null default now(),
    last_updated timestamp not null default now(),
    constraint pk_prediction_shared_prediction primary key (prediction_id, user_id),
    constraint fk_shared_prediction_prediction foreign key (prediction_id) references prediction.prediction(id),
    constraint fk_shared_prediction_user foreign key (user_id) references iam.user(id)
);

create index prediction_prediction_id_ix on prediction.shared_prediction(prediction_id);
create index prediction_user_id_ix on prediction.shared_prediction(user_id);


--
-- add can_share to prediction table
--

alter table prediction.prediction
add column can_share boolean not null default false
;
