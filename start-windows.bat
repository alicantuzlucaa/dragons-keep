@echo off
title Dragon's Keep - Starting...

echo.
echo  ===================================
echo   🐉 Dragon's Keep - Windows App 🐉
echo  ===================================
echo.
echo  Starting the application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm packages are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the application
echo 🚀 Launching Dragon's Keep...
npm start

pause
