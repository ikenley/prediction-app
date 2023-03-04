--
-- Creates prediction_app_user, a service account role for the predictions app
--

/* 
Outside of flyway, you will need to convert this to a user with a password:
alter role prediction_app_user login;
alter role prediction_app_user with password 'YOUR_SECRET_HERE';
*/
create role prediction_app_user;

-- Generic group for privaleges which will be granted to all service accounts
create role service_account_group; 

grant service_account_group to prediction_app_user;

grant iam_writer to service_account_group;
