--
-- Boostrapping scripts needed to get migrations running
--

-- create database antigone;

CREATE USER flyway_admin WITH PASSWORD 'DrCwrTRZ7mYEBVTY8Un9E80QQFmBlXY5' CREATEROLE;

grant all privileges on database core to flyway_admin;