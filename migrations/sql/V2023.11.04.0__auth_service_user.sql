--
-- Creates auth_service_user, a service account role for the auth service
--

create user auth_service_user with password '${AUTH_SERVICE_USER_PW}';

grant auth_writer to auth_service_user;

