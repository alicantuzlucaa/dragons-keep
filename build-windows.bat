@echo off
title Dragon's Keep - Building Windows App

echo.
echo  ==========================================
echo   🐉 Dragon's Keep - Windows Build Tool 🐉
echo  ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🏗️  Building Windows application...
npm run build-win
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo 📁 Check the 'dist' folder for the installer
echo.

REM Open dist folder if build succeeded
if exist "dist" (
    echo Opening dist folder...
    explorer dist
)

pause
