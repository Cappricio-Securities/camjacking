#!/bin/bash

set -e

echo "🔄 Updating system..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installing Git..."
sudo apt install -y git

echo "🟢 Installing Node.js (LTS) and npm..."
curl -fsSL https://nodejs.org/dist/v25.7.0/node-v25.7.0-linux-x64.tar.xz | sudo -E bash -
sudo apt install -y nodejs

echo "☁️ Installing cloudflared..."
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
rm cloudflared-linux-amd64.deb

echo "✅ Installation Complete!"
echo "----------------------------------"
echo "Git Version: $(git --version)"
echo "Node Version: $(node -v)"
echo "npm Version: $(npm -v)"
echo "cloudflared Version: $(cloudflared --version)"
echo "----------------------------------"
