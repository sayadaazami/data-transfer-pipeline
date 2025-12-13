#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "${SCRIPT_DIR}/config.sh"
. "${SCRIPT_DIR}/utils.sh"

if [ ! -f "${JDBC_PATH}" ]; then
    logInfo "Downloading JDBC driver"
    ensureDir "${JDBC_DIR}"
    curl -L -o "${JDBC_PATH}" "https://download.oracle.com/java/technologies/instant-client/jdbc/ojdbc11.jar"
    logInfo "JDBC downloaded successfully: ${JDBC_PATH}"
else
    logInfo "JDBC already exists: ${JDBC_PATH}"
fi