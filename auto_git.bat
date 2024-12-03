@echo off
title Auto Git
pushd "%~dp0"
:begin
set /p selection="1. Push vagy 2. Pull > "
set /p commit="Commit esetén commit message > "

if %selection%==1 (
    git add .
    git status
    set /p commit="Commit message: "
    echo %commit%
    git commit -m "%date% - %commit%"
    git push
) else if %selection%==2 (
    git pull
    goto end
) else (
    echo Hibás választás!
    goto begin
)


:end
net helpmsg %errorlevel%
timeout 5 /nobreak > nul
exit /b %errorlevel%