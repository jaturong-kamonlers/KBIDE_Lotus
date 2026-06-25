<#
.SYNOPSIS
    Install KBIDE_Lotus overlay on top of an existing KBIDE installation.

.DESCRIPTION
    Backs up the current `boards/` and `plugins/` folders to a timestamped
    backup directory, then copies the overlay contents on top.

.PARAMETER KBidePath
    Path to the KBIDE installation. Defaults to C:\KBIDE_Lotus.

.EXAMPLE
    .\install-overlay.ps1
    .\install-overlay.ps1 -KBidePath "D:\KBIDE_Lotus"

.NOTES
    Run as Administrator if KBIDE was installed in Program Files or similar.
#>

param(
    [string]$KBidePath = "C:\KBIDE_Lotus"
)

$ErrorActionPreference = "Stop"

Write-Host "=== KBIDE_Lotus Overlay Installer ===" -ForegroundColor Cyan
Write-Host "Target KBIDE: $KBidePath"

if (-not (Test-Path $KBidePath)) {
    Write-Host "ERROR: KBIDE not found at: $KBidePath" -ForegroundColor Red
    Write-Host "Use -KBidePath to specify a different location."
    exit 1
}

if (-not (Test-Path "$KBidePath\boards") -or -not (Test-Path "$KBidePath\plugins")) {
    Write-Host "ERROR: Target does not look like a KBIDE install (missing boards/ or plugins/)" -ForegroundColor Red
    exit 1
}

# Locate overlay root (parent of this script's folder)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$overlayRoot = Split-Path -Parent $scriptDir

if (-not (Test-Path "$overlayRoot\boards") -or -not (Test-Path "$overlayRoot\plugins")) {
    Write-Host "ERROR: Overlay payload not found relative to this script." -ForegroundColor Red
    Write-Host "Expected: $overlayRoot\boards  and  $overlayRoot\plugins"
    exit 1
}

# Create backup
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = Join-Path $KBidePath "backup_$timestamp"
Write-Host ""
Write-Host "Step 1/2: Backing up existing boards/ and plugins/..."
Write-Host "  -> $backupDir"
New-Item -ItemType Directory -Path $backupDir | Out-Null
Copy-Item -Recurse "$KBidePath\boards" "$backupDir\boards"
Copy-Item -Recurse "$KBidePath\plugins" "$backupDir\plugins"
Write-Host "  Backup OK." -ForegroundColor Green

# Apply overlay
Write-Host ""
Write-Host "Step 2/2: Applying overlay from $overlayRoot..."
Copy-Item -Recurse -Force "$overlayRoot\boards\*" "$KBidePath\boards\"
Copy-Item -Recurse -Force "$overlayRoot\plugins\*" "$KBidePath\plugins\"
Write-Host "  Overlay applied." -ForegroundColor Green

# Copy docs alongside if present
foreach ($doc in @("README.md", "NOTICE.md", "CHANGELOG.md", "INSTALL.md")) {
    if (Test-Path "$overlayRoot\$doc") {
        Copy-Item -Force "$overlayRoot\$doc" "$KBidePath\"
    }
}

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Cyan
Write-Host "Restart KBIDE to pick up the changes."
Write-Host "If something breaks, restore from:"
Write-Host "  $backupDir"
