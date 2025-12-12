#!/bin/sh

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly RESOURCES_DIR="${SCRIPT_DIR}/resources"
readonly OUTPUT_DIR="${SCRIPT_DIR}/output"
readonly PARTITIONS_FILE="${RESOURCES_DIR}/partitions.json"
readonly JDBC_PATH="/etc/logstash/conf.d/jdbc/jdbc.jar"
readonly PERSON_TEMPLATE="${RESOURCES_DIR}/templates/person.template.conf"
readonly COMPANY_TEMPLATE="${RESOURCES_DIR}/templates/company.template.conf"