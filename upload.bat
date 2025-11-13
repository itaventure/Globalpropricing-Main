@echo off
chcp 65001 > nul
echo.
echo ============================================
echo    🚀 GlobalProPricing Upload Tool
echo ============================================
echo.

echo 📅 Upload Date: %date%
echo ⏰ Upload Time: %time%
echo.

echo 🔍 Checking Git installation...
git --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git is installed
echo.

echo 📁 Checking if this is a Git repository...
git status > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: This is not a Git repository!
    echo.
    echo 📝 Please run these commands first:
    echo git init
    echo git remote add origin https://github.com/YOUR-USERNAME/GlobalProPricing-Main.git
    echo.
    pause
    exit /b 1
)
echo ✅ Git repository found
echo.

echo 🌐 Checking internet connection...
ping -n 1 github.com > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: No internet connection!
    echo Please check your internet and try again.
    pause
    exit /b 1
)
echo ✅ Internet connection available
echo.

echo 📊 Current Git status:
git status
echo.

echo 📦 Adding all files to upload...
git add .
echo ✅ Files added successfully
echo.

echo 💾 Creating commit...
set "commit_msg=Update: GlobalProPricing project - %date% %time%"
git commit -m "%commit_msg%"
echo ✅ Commit created: %commit_msg%
echo.

echo 🚀 Uploading to GitHub...
git push origin main
if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo    ✅ UPLOAD SUCCESSFUL!
    echo ============================================
    echo.
    echo 📍 Files uploaded to GitHub
    echo 📅 Date: %date%
    echo ⏰ Time: %time%
    echo 🌐 Visit: https://github.com/YOUR-USERNAME/GlobalProPricing-Main
    echo 🌍 Live Website: https://YOUR-USERNAME.github.io/GlobalProPricing-Main/
    echo.
    echo 🎉 Upload process completed successfully!
) else (
    echo ❌ ERROR: Upload failed!
    echo.
    echo 🔧 Possible solutions:
    echo 1. Check GitHub credentials
    echo 2. Run: git push -u origin main
    echo 3. Check remote URL: git remote -v
    echo.
)

echo.
pause