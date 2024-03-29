PGHOST="host.docker.internal"
PGPORT="5433"
PGDATABASE="postgres"
FLYWAY_URL="jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}"
FLYWAY_USER="postgres"
FLYWAY_PASSWORD="postgres"
FLYWAY_DEFAULT_SCHEMA=flyway
FLYWAY_CONNECT_RETRIES=2
FLYWAY_LOCATIONS="filesystem:./sql,filesystem:./local"
FLYWAY_PLACEHOLDERS_USER_ID="112128006390330413755"
FLYWAY_PLACEHOLDERS_PREDICTION_APP_USER_PW="postgres"

docker run --rm -v ./migrations/sql:/flyway/sql -e FLYWAY_URL=$FLYWAY_URL -e FLYWAY_USER=$FLYWAY_USER -e FLYWAY_PASSWORD=$FLYWAY_PASSWORD -e FLYWAY_DEFAULT_SCHEMA=flyway -e FLYWAY_CONNECT_RETRIES=10 -e FLYWAY_LOCATIONS="filesystem:./sql" -e FLYWAY_PLACEHOLDERS_USER_ID=$FLYWAY_PLACEHOLDERS_USER_ID -e FLYWAY_PLACEHOLDERS_PREDICTION_APP_USER_PW=$FLYWAY_PLACEHOLDERS_PREDICTION_APP_USER_PW flyway/flyway:9.15.1 migrate