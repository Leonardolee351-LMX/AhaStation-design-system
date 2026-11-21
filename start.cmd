@echo off
setlocal
cd /d "%~dp0"
set "PORT=5174"

where python >nul 2>&1 && set "PY=python"
if not defined PY where py >nul 2>&1 && set "PY=py -3"
if not defined PY where python3 >nul 2>&1 && set "PY=python3"

echo.
echo AhaStation 设计系统
echo 本机浏览器: http://localhost:%PORT%/
echo.

if not defined PY (
  echo 未检测到 Python。已直接用浏览器打开 index.html。
  start "" "%~dp0index.html"
  pause
  exit /b 0
)

start "" "http://localhost:%PORT%/"
%PY% -m http.server %PORT%
if errorlevel 1 (
  echo 端口 %PORT% 可能已被占用。若页面已经能打开，可以忽略这条提示。
  pause
)
exit /b 0
