#!/bin/bash
cd "$(dirname "$0")"
PORT=5174
URL="http://localhost:${PORT}/"

if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "未检测到 Python。已直接用浏览器打开 index.html。"
  open "./index.html"
  read -r -p "按 Enter 关闭… "
  exit 0
fi

echo "AhaStation 设计系统"
echo "本机浏览器: ${URL}"
open "$URL"
"$PY" -m http.server "$PORT"
status=$?
if [ "$status" -ne 0 ]; then
  echo "端口 ${PORT} 可能已被占用。若页面已经能打开，可以忽略这条提示。"
  read -r -p "按 Enter 关闭… "
fi
exit "$status"
