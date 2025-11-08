@echo off
echo ========================================
echo GitHub'a Push Ediliyor...
echo ========================================
echo.

REM GitHub Desktop varsa kullan
if exist "%LOCALAPPDATA%\GitHubDesktop\GitHubDesktop.exe" (
    echo GitHub Desktop bulundu! Aciliyor...
    start "" "%LOCALAPPDATA%\GitHubDesktop\GitHubDesktop.exe"
    echo.
    echo GitHub Desktop'ta:
    echo 1. Repository'yi sec
    echo 2. "Publish repository" veya "Push origin" tikla
    echo.
    pause
    exit
)

REM GitHub Desktop yoksa manuel push
echo GitHub Desktop bulunamadi.
echo.
echo Manuel push icin:
echo 1. GitHub Personal Access Token olustur
echo 2. Asagidaki komutu calistir:
echo.
echo git push -u origin main
echo.
echo Username: alicantuzlucaa
echo Password: [TOKEN'I YAPIŞTIR]
echo.
pause
