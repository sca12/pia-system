#!/bin/bash

#
# SPDX-FileCopyrightText: 2021 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
#
# SPDX-License-Identifier: AGPL-3.0-or-later
#

KEYCLOAK_PATH=/api/v1/auth

STRICT_HTTPS=true
if [ "${EXTERNAL_PROTOCOL}" == "http" ]; then
    STRICT_HTTPS=false
fi

kc.sh \
    -Dkc.db=postgres \
    -Dkc.db.username=${DB_AUTHSERVER_USER} \
    -Dkc.db.password=${DB_AUTHSERVER_PASSWORD} \
    -Dkc.db.url.port=${DB_AUTHSERVER_PORT} \
    -Dkc.db.url.host=${DB_AUTHSERVER_HOST} \
    -Dkc.db.url.database=${DB_AUTHSERVER_DB} \
    "-Dkc.db.url.properties=\"?sslmode=verify-ca&sslrootcert=/certs/ca.cert\"" \
    -Djava.security.egd=file:/dev/urandom \
    start \
    --hostname=${EXTERNAL_HOST} \
    --hostname-admin=${EXTERNAL_HOST}${KEYCLOAK_PATH} \
    --hostname-path=${KEYCLOAK_PATH} \
    --hostname-strict=true \
    --hostname-strict-backchannel=true \
    --hostname-strict-https=${STRICT_HTTPS} \
    --https-certificate-key-file=/certs/authserver.key \
    --https-certificate-file=/certs/authserver.cert \
    --https-port=4000 \
    --proxy=reencrypt
