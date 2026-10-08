@echo off
cd /d "%~dp0"
call npx ng build --configuration production > build.log 2>&1
echo EXIT=%errorlevel% >> build.log
