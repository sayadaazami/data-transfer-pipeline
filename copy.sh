#!/bin/sh
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
DEST_DIR="/etc/logstash"
BACKUP_DIR="$DEST_DIR/backups"
DATE_FOLDER=$(/bin/date +"%Y-%m-%d-%H-%M-%S")

mkdir -p "$DEST_DIR/conf.d" "$DEST_DIR/env" "$BACKUP_DIR"

# Create backup if any of these exist in DEST_DIR
backup_items=""
for item in conf.d env pipelines.yml; do
    if [ -e "$DEST_DIR/$item" ]; then
        backup_items="$backup_items $item"
    fi
done

if [ -n "$backup_items" ]; then
    tar -czvf "$BACKUP_DIR/$DATE_FOLDER.tar.gz" -C "$DEST_DIR" $backup_items
fi

cp -r "$SCRIPT_DIR/conf.d/." "$DEST_DIR/conf.d"
cp -r "$SCRIPT_DIR/env/." "$DEST_DIR/env"
cp "$SCRIPT_DIR/pipelines.yml" "$DEST_DIR/pipelines.yml"

chown -R logstash:logstash "$SCRIPT_DIR/conf.d"

echo "\033[38;5;82m\033[1m========================================================================\033[0m"
echo "\033[38;5;208m\033[1mdo not forget to output/default-lostash.conf content to /etc/default/logstash\033[0m"
echo "\033[38;5;82m\033[1m========================================================================\033[0m"
