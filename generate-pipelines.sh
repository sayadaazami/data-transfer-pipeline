#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
. "${SCRIPT_DIR}/config.sh"
. "${SCRIPT_DIR}/utils.sh"


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
    local output_file="${JDBC_OUTPUT}/${type,,}_v1_${index}_seq"
    
    ensureParentDir "${output_file}"
    echo "--- ${min_value}" > "${output_file}"
}

generateEnvFile() {
    local type="$1"
    local index="$2"
    local max_value="$3"
    local env_file=""
    
    case "${type,,}" in
        person)
            env_file="${PERSON_ENV_FILE}"
            ;;
        company)
            env_file="${COMPANY_ENV_FILE}"
            ;;
    esac
    
    ensureParentDir "${env_file}"
    
    if [ "${index}" -eq 1 ]; then
        > "${env_file}"
    fi
    
    echo "SQL_MAX_VALUE_${type^^}_V1_${index}=${max_value}" >> "${env_file}"
}

generatePipelinesYmlFile() {
    > "${PIPELINES_YML_OUTPUT}"

    sorted_files=($(ls "${CONF_D_OUTPUT}"/*.conf 2>/dev/null | xargs -n1 basename | sort -V))

    for filename in "${sorted_files[@]}"; do
        base="${filename%.conf}"
        {
            echo "- pipeline.id: ${base}"
            echo "  path.config: \"/etc/logstash/conf.d/${base}.conf\""
            echo "  pipeline.batch.delay: 5"
            echo ""
        } >> "${PIPELINES_YML_OUTPUT}"
    done
}

generateLogstashDefaultsFile() {
    cp "${DEFAULT_LOGSTASH_TEMPLATE}" "${DEFAULT_LOGSTASH_OUTPUT}"

    echo "" >> "${DEFAULT_LOGSTASH_OUTPUT}"
    echo "# MAX VALUES FOR PERSON" >> "${DEFAULT_LOGSTASH_OUTPUT}"
    cat "${PERSON_ENV_FILE}" >> "${DEFAULT_LOGSTASH_OUTPUT}"

    echo "" >> "${DEFAULT_LOGSTASH_OUTPUT}"
    echo "# MAX VALUES FOR COMPANY" >> "${DEFAULT_LOGSTASH_OUTPUT}"
    cat "${COMPANY_ENV_FILE}" >> "${DEFAULT_LOGSTASH_OUTPUT}"
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
            logError "Unknown type: ${type}"
            exit 1
            ;;
    esac
    
    local output_file="${CONF_D_OUTPUT}/${type,,}_v1_${index}.conf"
    ensureParentDir "${output_file}"
    
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
    logInfo "Starting pipeline generation"
    
    requireCommand "jq"
    requireFile "${PARTITIONS_FILE}"

    if [ -d "${OUTPUT_DIR}" ]; then
        logInfo "Cleaning output directory"
        rm -rf "${OUTPUT_DIR}"
    fi
    
    logInfo "Processing PERSON partitions"
    processPartitions "PERSON"
    
    logInfo "Processing COMPANY partitions"
    processPartitions "COMPANY"
    
    logInfo "Generating pipelines.yml"
    generatePipelinesYmlFile
    logInfo "Generating default-lostash.conf"
    generateLogstashDefaultsFile
    
    logInfo "Pipeline generation completed"
}

main "$@"

