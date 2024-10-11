@echo off
cd C:\Scripts

:checkInternet
echo Checking for internet connection...

REM Check internet connection
ping -n 1 google.com >nul 2>&1

if errorlevel 1 (
    echo No internet connection. Retrying in 10 seconds...
    timeout /t 10 /nobreak >nul
    goto checkInternet
) else (
    echo Internet connection established. Running script...

    REM Run the Playwright script
    npx playwright test ./test-9.spec.ts --project chromium --headed --trace on --workers 1 --timeout 600000

    REM Check if Playwright test ran successfully
    if %errorlevel% neq 0 (
        echo Playwright test failed with error code %errorlevel%. >> script_run_log.txt
    ) else (
        echo Playwright test succeeded. >> script_run_log.txt
    )

    REM Log the time of completion
    echo Script ran at %time% on %date% >> script_run_log.txt

    REM Wait for 5 seconds for testing
    echo Waiting for 5 seconds...
    timeout /t 5 /nobreak

    REM Repeat the process
    goto checkInternet
)

REM Keep the command prompt open
pause
