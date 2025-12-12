#!/bin/sh

log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local color=""
    local reset="\033[0m"
    
    case "${level}" in
        INFO)
            color="\033[38;5;82m"
            ;;
        WARN)
            color="\033[38;5;208m"
            ;;
        ERROR)
            color="\033[38;5;196m"
            ;;
        *)
            color="\033[0m"
            ;;
    esac
    
    echo -e "${color}[${timestamp}] [${level}]${reset} ${message}"
}

logInfo() {
    log "INFO" "$@"
}

logWarn() {
    log "WARN" "$@"
}

logError() {
    log "ERROR" "$@" >&2
}

ensureDir() {
    local dir="$1"
    if [ ! -d "${dir}" ]; then
        mkdir -p "${dir}"
    fi
}

requireCommand() {
    local cmd="$1"
    if ! command -v "${cmd}" &> /dev/null; then
        logError "${cmd} is required but not installed"
        exit 1
    fi
}

requireFile() {
    local file="$1"
    if [ ! -f "${file}" ]; then
        logError "File not found: ${file}"
        exit 1
    fi
}

ensureParentDir() {
    local file="$1"
    local dir=$(dirname "${file}")
    ensureDir "${dir}"
}

createBackup() {
    local backup_dir="$1"
    local dest_dir="$2"
    local items_to_check="$3"
    
    ensureDir "${backup_dir}"
    
    local backup_items=""
    for item in ${items_to_check}; do
        if [ -e "${dest_dir}/${item}" ]; then
            backup_items="${backup_items} ${item}"
        fi
    done
    
    if [ -n "${backup_items}" ]; then
        local date_folder=$(date +"%Y-%m-%d-%H-%M-%S")
        local backup_file="${backup_dir}/${date_folder}.tar.gz"
        
        logInfo "Creating backup: ${backup_file}"
        tar -czf "${backup_file}" -C "${dest_dir}" ${backup_items}
        logInfo "Backup created successfully"
    fi
}

