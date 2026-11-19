#!/usr/bin/env bash
# macOS: double-click on the NODE machine. Opens LUMA Scan in admin mode: it talks to the nodes and control panels on THIS computer
# (Mainnet 6006 / panel 8090, Testnet 6106 / panel 8091), so the Nodes tab shows every node's health. Starts the nodes first if they are not running.
DIR="$(cd "$(dirname "$0")" && pwd)"; cd "$DIR" || exit 1
export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin:/Applications/Docker.app/Contents/Resources/bin"
PORT=8097
command -v node >/dev/null || { echo "Node.js is needed (nodejs.org). Install it, then run this again."; read -r -p "Press Return." _; exit 1; }
up() { curl -s -m 2 -X POST http://127.0.0.1:$1 -d '{"method":"server_info"}' 2>/dev/null | grep -q server_state; }
if ! up 5006 && ! up 5106; then
  echo "No LUMA node is answering on this computer. Starting Mainnet and Testnet (this can take a minute)..."
  chmod +x luma-auto.sh start-luma.sh lumactl 2>/dev/null
  bash ./luma-auto.sh main; bash ./luma-auto.sh test
fi
for OLD in $(lsof -ti tcp:$PORT -sTCP:LISTEN 2>/dev/null); do ps -p "$OLD" -o command= 2>/dev/null | grep -qiE "docker|vpnkit|virtualization|colima|lima" || kill "$OLD" 2>/dev/null; done
SCAN_PORT=$PORT node serve-admin.js &
SV=$!; trap 'kill $SV 2>/dev/null' EXIT
sleep 1
URL="http://127.0.0.1:$PORT/"
open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || echo "Open $URL in your browser."
echo; echo "LUMA Scan (admin) is running at $URL. Leave this window open; close it to stop."
wait $SV
