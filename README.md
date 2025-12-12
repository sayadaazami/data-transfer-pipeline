# Data Transfer Pipeline

Scripts to generate Logstash pipeline configurations for data transfer from Oracle to Elasticsearch.

## Files

### Core Scripts

- **`make.sh`** - Main entry point, runs all steps in sequence
- **`download-jdbc.sh`** - Downloads Oracle JDBC driver
- **`generate-pipelines.sh`** - Generates Logstash configuration files from templates
- **`copy.sh`** - Copies generated files to `/etc/logstash` with backup

### Configuration

- **`config.sh`** - Centralized configuration variables
- **`utils.sh`** - Utility functions (logging, directory management, etc.)

### Resources

- **`resources/partitions.json`** - Partition definitions for PERSON and COMPANY types
- **`resources/templates/`** - Template files for pipeline configurations
  - `person.template.conf` - Person pipeline template
  - `company.template.conf` - Company pipeline template
  - `default-lostash.template.conf` - Default Logstash configuration template

## Usage

Run the complete pipeline:

```bash
sudo sh make.sh
```

Or run steps individually:

```bash
# Download JDBC driver
sudo sh download-jdbc.sh

# Generate pipeline configurations
sh generate-pipelines.sh

# Copy files to /etc/logstash (requires sudo)
sudo sh copy.sh
```

## Output

Generated files are placed in the `output/` directory:

- `output/conf.d/` - Logstash pipeline configuration files
- `output/env/` - Environment variable files
- `output/pipelines.yml` - Logstash pipelines configuration
- `output/default-lostash.conf` - Default Logstash configuration

## Requirements

- `jq` - JSON processor
- `curl` - For downloading JDBC driver
- `tar` - For backup creation


