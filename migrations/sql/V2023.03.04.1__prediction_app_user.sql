--
-- Creates prediction_app_user, a service account role for the predictions app
--

create user prediction_app_user with password '${PREDICTION_APP_USER_PW}';

-- Generic group for privaleges which will be granted to all service accounts
create role service_account_group; 

grant service_account_group to prediction_app_user;

grant iam_writer to service_account_group;
