# Function to log messages with custom colors
log() {
  local color="$1"
  local message="$2"
  local reset='\033[0m'
  echo -e "${color}${message}${reset}"
}

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'

# Define console-like functions for logging
info() {
  log "$BLUE" "$1"
}

success() {
  log "$GREEN" "$1"
}

warning() {
  log "$YELLOW" "$1"
}

error() {
  log "$RED" "$1"
}
