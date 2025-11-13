#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print colored output
print_color() {
    echo -e "${2}${1}${NC}"
}

echo
print_color "============================================" "$CYAN"
print_color "    🚀 GlobalProPricing Upload Tool" "$CYAN"
print_color "============================================" "$CYAN"
echo

# Current date and time
CURRENT_DATE=$(date +"%Y-%m-%d")
CURRENT_TIME=$(date +"%H:%M:%S")

print_color "📅 Upload Date: $CURRENT_DATE" "$YELLOW"
print_color "⏰ Upload Time: $CURRENT_TIME" "$YELLOW"
echo

# Check if Git is installed
print_color "🔍 Checking Git installation..." "$BLUE"
if ! command -v git &> /dev/null; then
    print_color "❌ ERROR: Git is not installed!" "$RED"
    print_color "Please install Git from: https://git-scm.com/" "$RED"
    exit 1
fi
print_color "✅ Git is installed" "$GREEN"
echo

# Check if we're in a git repository
print_color "📁 Checking if this is a Git repository..." "$BLUE"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_color "❌ ERROR: This is not a Git repository!" "$RED"
    echo
    print_color "📝 Please run these commands first:" "$YELLOW"
    print_color "git init" "$YELLOW"
    print_color "git remote add origin https://github.com/YOUR-USERNAME/GlobalProPricing-Main.git" "$YELLOW"
    echo
    exit 1
fi
print_color "✅ Git repository found" "$GREEN"
echo

# Check internet connection
print_color "🌐 Checking internet connection..." "$BLUE"
if ! ping -c 1 github.com &> /dev/null; then
    print_color "❌ ERROR: No internet connection!" "$RED"
    print_color "Please check your internet and try again." "$RED"
    exit 1
fi
print_color "✅ Internet connection available" "$GREEN"
echo

# Show git status
print_color "📊 Current Git status:" "$BLUE"
git status
echo

# Add all files
print_color "📦 Adding all files to upload..." "$BLUE"
git add .
print_color "✅ Files added successfully" "$GREEN"
echo

# Create commit
print_color "💾 Creating commit..." "$BLUE"
COMMIT_MESSAGE="Update: GlobalProPricing project - $CURRENT_DATE $CURRENT_TIME"
git commit -m "$COMMIT_MESSAGE"
print_color "✅ Commit created: $COMMIT_MESSAGE" "$GREEN"
echo

# Push to GitHub
print_color "🚀 Uploading to GitHub..." "$BLUE"
if git push origin main; then
    echo
    print_color "============================================" "$GREEN"
    print_color "    ✅ UPLOAD SUCCESSFUL!" "$GREEN"
    print_color "============================================" "$GREEN"
    echo
    print_color "📍 Files uploaded to GitHub" "$GREEN"
    print_color "📅 Date: $CURRENT_DATE" "$GREEN"
    print_color "⏰ Time: $CURRENT_TIME" "$GREEN"
    print_color "🌐 Repository: https://github.com/YOUR-USERNAME/GlobalProPricing-Main" "$GREEN"
    print_color "🌍 Live Website: https://YOUR-USERNAME.github.io/GlobalProPricing-Main/" "$GREEN"
    echo
    print_color "🎉 Upload process completed successfully!" "$GREEN"
else
    print_color "❌ ERROR: Upload failed!" "$RED"
    echo
    print_color "🔧 Possible solutions:" "$YELLOW"
    print_color "1. Check GitHub credentials" "$YELLOW"
    print_color "2. Run: git push -u origin main" "$YELLOW"
    print_color "3. Check remote URL: git remote -v" "$YELLOW"
    echo
    exit 1
fi

echo