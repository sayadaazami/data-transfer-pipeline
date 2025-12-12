#!/bin/sh

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly RESOURCES_DIR="${SCRIPT_DIR}/resources"
readonly OUTPUT_DIR="${SCRIPT_DIR}/output"
readonly PARTITIONS_FILE="${RESOURCES_DIR}/partitions.json"
readonly JDBC_PATH="/etc/logstash/conf.d/jdbc/jdbc.jar"
readonly PERSON_TEMPLATE="${RESOURCES_DIR}/templates/person.template.conf"
readonly COMPANY_TEMPLATE="${RESOURCES_DIR}/templates/company.template.conf"


readPartitions() {
    local type="$1"
    jq -r --arg type "${type}" '
        map(select(.TYPE == $type)) | 
        sort_by(.MIN_VALUE) | 
        .[] | 
        "\(.MIN_VALUE)|\(.MAX_VALUE)"
    ' "${PARTITIONS_FILE}"
}

generateSeqFile() {
    local type="$1"
    local index="$2"
    local min_value="$3"
    local output_file="${OUTPUT_DIR}/conf.d/jdbc/${type,,}_v1_${index}_seq"
    
    mkdir -p "$(dirname "${output_file}")"
    echo "--- ${min_value}" > "${output_file}"
}

generateEnvFile() {
    local type="$1"
    local index="$2"
    local max_value="$3"
    local env_file="${OUTPUT_DIR}/env/${type,,}_logstash_env"
    
    mkdir -p "$(dirname "${env_file}")"
    
    if [[ "${index}" -eq 1 ]]; then
        > "${env_file}"
    fi
    
    echo "SQL_MAX_VALUE_${type^^}_V1_${index}=${max_value}" >> "${env_file}"
}

generatePipelinesYmlFile() {
    local OUTPUT_FILE="${OUTPUT_DIR}/pipelines.yml"
    > "$OUTPUT_FILE"

    sorted_files=($(ls "${OUTPUT_DIR}/conf.d"/*.conf 2>/dev/null | xargs -n1 basename | sort -V))

    for filename in "${sorted_files[@]}"; do
        file="${OUTPUT_DIR}/conf.d/$filename"
        base="${filename%.conf}"
        {
            echo "- pipeline.id: $base"
            echo "  path.config: \"/etc/logstash/conf.d/$base.conf\""
            echo "  pipeline.batch.delay: 5"
            echo ""
        } >> "$OUTPUT_FILE"
    done
}

generateLogstashDefaultsFile() {
    local FILE_NAME="${OUTPUT_DIR}/default-lostash.conf"    
    cp "${RESOURCES_DIR}/templates/default-lostash.template.conf" "${FILE_NAME}"

    echo "" >> "${FILE_NAME}"
    echo "# MAX VALUES FOR PERSON" >> "${FILE_NAME}"
    cat "${OUTPUT_DIR}/env/person_logstash_env" >> "${FILE_NAME}"

    echo "" >> "${FILE_NAME}"
    echo "# MAX VALUES FOR COMPANY" >> "${FILE_NAME}"
    cat "${OUTPUT_DIR}/env/company_logstash_env" >> "${FILE_NAME}"
}

replaceTemplateVars() {
    local template_file="$1"
    local type="$2"
    local index="$3"
    
    local metadata_path="/etc/logstash/conf.d/jdbc/${type,,}_v1_${index}_seq"
    
    sed \
        -e "s|\${INDEX}|${index}|g" \
        -e "s|\${JDBC_PATH}|${JDBC_PATH}|g" \
        -e "s|\${METADATA_PATH}|${metadata_path}|g" \
        "${template_file}"
}

generateConfigFile() {
    local type="$1"
    local index="$2"
    local template_file=""
    
    case "${type,,}" in
        person)
            template_file="${PERSON_TEMPLATE}"
            ;;
        company)
            template_file="${COMPANY_TEMPLATE}"
            ;;
        *)
            echo "Error: Unknown type ${type}" >&2
            exit 1
            ;;
    esac
    
    local output_file="${OUTPUT_DIR}/conf.d/${type,,}_v1_${index}.conf"
    mkdir -p "$(dirname "${output_file}")"
    
    replaceTemplateVars "${template_file}" "${type,,}" "${index}" > "${output_file}"
}

processPartitions() {
    local type="$1"
    local index=1
    
    while IFS='|' read -r min_value max_value; do
        generateSeqFile "${type}" "${index}" "${min_value}"
        generateEnvFile "${type}" "${index}" "${max_value}"
        generateConfigFile "${type}" "${index}"
        ((index++))
    done < <(readPartitions "${type}")
}

main() {
    if ! command -v jq &> /dev/null; then
        echo "Error: jq is required but not installed" >&2
        exit 1
    fi
    
    if [[ ! -f "${PARTITIONS_FILE}" ]]; then
        echo "Error: Partitions file not found: ${PARTITIONS_FILE}" >&2
        exit 1
    fi

    if [ -d "output" ]; then
        rm -rf output
    fi
    
    processPartitions "PERSON"
    processPartitions "COMPANY"
    
    generatePipelinesYmlFile
    generateLogstashDefaultsFile
}

main "$@"

