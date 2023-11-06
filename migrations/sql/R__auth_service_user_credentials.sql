--
-- Rotate credentials for auth_service_user
--

alter user auth_service_user with password '${AUTH_SERVICE_USER_PW}';
