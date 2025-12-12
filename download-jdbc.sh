#!/bin/sh

readonly JDBC_DIR="/etc/logstash/conf.d/jdbc"
readonly JDBC_PATH="${JDBC_DIR}/jdbc.jar"
readonly JBC_VERSION="ojdbc11"

if [[ ! -f "${JDBC_PATH}" ]]; then
    mkdir -p "${JDBC_DIR}"
    curl -o "${JDBC_PATH}" "https://download.oracle.com/otn-pub/otn_software/jdbc/2326/${JDBC_VERSION}.jar"
    echo "JDBC downloaded successfully"
else
    echo "JDBC already exists"
fi