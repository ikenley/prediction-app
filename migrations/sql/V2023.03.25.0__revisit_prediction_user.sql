--
-- Creates revisit_prediction_user, a service account role for the revisit prediction lambda function
--

create user revisit_prediction_user with password '${REVISIT_PREDICTION_USER_PW}';

grant service_account_group to revisit_prediction_user;

