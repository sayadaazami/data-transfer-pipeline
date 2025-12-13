#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

RESOURCES_DIR="${SCRIPT_DIR}/resources"
OUTPUT_DIR="${SCRIPT_DIR}/output"
PARTITIONS_FILE="${RESOURCES_DIR}/partitions.json"

TEMPLATES_DIR="${RESOURCES_DIR}/templates"
PERSON_TEMPLATE="${TEMPLATES_DIR}/person.template.conf"
COMPANY_TEMPLATE="${TEMPLATES_DIR}/company.template.conf"
DEFAULT_LOGSTASH_TEMPLATE="${TEMPLATES_DIR}/default-lostash.template.conf"

JDBC_DIR="/etc/logstash/conf.d/jdbc"
JDBC_PATH="${JDBC_DIR}/jdbc.jar"
JDBC_VERSION="ojdbc11"

DEST_DIR="/etc/logstash"
BACKUP_DIR="${DEST_DIR}/backups"

CONF_D_OUTPUT="${OUTPUT_DIR}/conf.d"
JDBC_OUTPUT="${CONF_D_OUTPUT}/jdbc"
ENV_OUTPUT="${OUTPUT_DIR}/env"
PIPELINES_YML_OUTPUT="${OUTPUT_DIR}/pipelines.yml"
DEFAULT_LOGSTASH_OUTPUT="${OUTPUT_DIR}/default-lostash.conf"

PERSON_ENV_FILE="${ENV_OUTPUT}/person_logstash_env"
COMPANY_ENV_FILE="${ENV_OUTPUT}/company_logstash_env"
