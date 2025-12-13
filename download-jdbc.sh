#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "${SCRIPT_DIR}/config.sh"
. "${SCRIPT_DIR}/utils.sh"

if [ ! -f "${JDBC_PATH}" ]; then
    logInfo "Downloading JDBC driver"
    ensureDir "${JDBC_DIR}"
    curl -o "${JDBC_PATH}" "https://download.oracle.com/otn-pub/otn_software/jdbc/2326/${JDBC_VERSION}.jar"
    logInfo "JDBC downloaded successfully: ${JDBC_PATH}"
else
    logInfo "JDBC already exists: ${JDBC_PATH}"
fi