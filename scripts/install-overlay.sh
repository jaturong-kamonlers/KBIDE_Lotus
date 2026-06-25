#!/usr/bin/env bash
#
# Install KBIDE_Lotus overlay on top of an existing KBIDE installation.
#
# Usage:
#   ./install-overlay.sh [path-to-kbide]
#
# Defaults to /opt/kbide if no path is given.
# Use sudo if KBIDE is installed in a system path.

set -euo pipefail

KBIDE_PATH="${1:-/opt/kbide}"

echo "=== KBIDE_Lotus Overlay Installer ==="
echo "Target KBIDE: $KBIDE_PATH"

if [ ! -d "$KBIDE_PATH" ]; then
    echo "ERROR: KBIDE not found at: $KBIDE_PATH" >&2
    echo "Usage: $0 <path-to-kbide>" >&2
    exit 1
fi

if [ ! -d "$KBIDE_PATH/boards" ] || [ ! -d "$KBIDE_PATH/plugins" ]; then
    echo "ERROR: Target does not look like a KBIDE install (missing boards/ or plugins/)" >&2
    exit 1
fi

# Locate overlay root (parent of this script's folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OVERLAY_ROOT="$(dirname "$SCRIPT_DIR")"

if [ ! -d "$OVERLAY_ROOT/boards" ] || [ ! -d "$OVERLAY_ROOT/plugins" ]; then
    echo "ERROR: Overlay payload not found relative to this script." >&2
    echo "Expected: $OVERLAY_ROOT/boards  and  $OVERLAY_ROOT/plugins" >&2
    exit 1
fi

# Backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$KBIDE_PATH/backup_$TIMESTAMP"

echo
echo "Step 1/2: Backing up existing boards/ and plugins/..."
echo "  -> $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r "$KBIDE_PATH/boards" "$BACKUP_DIR/boards"
cp -r "$KBIDE_PATH/plugins" "$BACKUP_DIR/plugins"
echo "  Backup OK."

# Overlay
echo
echo "Step 2/2: Applying overlay from $OVERLAY_ROOT..."
cp -rf "$OVERLAY_ROOT/boards/." "$KBIDE_PATH/boards/"
cp -rf "$OVERLAY_ROOT/plugins/." "$KBIDE_PATH/plugins/"
echo "  Overlay applied."

# Optional: docs alongside
for doc in README.md NOTICE.md CHANGELOG.md INSTALL.md; do
    if [ -f "$OVERLAY_ROOT/$doc" ]; then
        cp -f "$OVERLAY_ROOT/$doc" "$KBIDE_PATH/"
    fi
done

echo
echo "=== Done! ==="
echo "Restart KBIDE to pick up the changes."
echo "If something breaks, restore from:"
echo "  $BACKUP_DIR"
