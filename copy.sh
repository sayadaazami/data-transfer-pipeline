#!/bin/sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
. "${SCRIPT_DIR}/config.sh"
. "${SCRIPT_DIR}/utils.sh"

ensureDir "${DEST_DIR}/conf.d"
ensureDir "${DEST_DIR}/env"

createBackup "${BACKUP_DIR}" "${DEST_DIR}" "conf.d env pipelines.yml"

logInfo "Copying files to ${DEST_DIR}"
cp -r "${CONF_D_OUTPUT}/." "${DEST_DIR}/conf.d"
cp -r "${ENV_OUTPUT}/." "${DEST_DIR}/env"
cp "${PIPELINES_YML_OUTPUT}" "${DEST_DIR}/pipelines.yml"

chown -R logstash:logstash "${DEST_DIR}/conf.d" "${DEST_DIR}/env"

logWarn "=============================================================================="
logWarn "Do not forget to copy ${DEFAULT_LOGSTASH_OUTPUT} content to /etc/default/logstash"
logWarn "=============================================================================="
