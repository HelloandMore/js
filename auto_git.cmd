@echo off
set /p selection="1. Push vagy 2. Pull > "

if /i %selection%=="push" or %selection%=="pus" or %selection%=="1" (
    git add .
    git status
    echo.
    set /p commit="Add meg a commit messaget > "
    git commit -m "%date% - %commit%"
    git push
    goto :end
)
else /i if %selection%=="pull" or %selection%=="pul" or %selection%=="2" (
    git pull
    goto :end
)

:end
net helpmsg %errorlevel%
timeout 5 /nobreak > nul
exit /b %errorlevel%