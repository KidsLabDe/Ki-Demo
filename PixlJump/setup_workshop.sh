#!/bin/bash

# Workshop Setup Script for Manjaro Linux
# Installs: Node.js, npm, Chromium, VS Code, Git, and Antigravity

set -e # Exit on error

echo "🚀 Starting Workshop Setup for Manjaro..."

# 1. System Update
echo "📦 Updating system repositories..."
sudo pacman -Syu --noconfirm

# 2. Install Development Tools & Node.js
echo "🛠️ Installing basic dev tools, Node.js (npm), and Git..."
sudo pacman -S --needed --noconfirm base-devel git nodejs npm

# 3. Install Chromium Browser
echo "🌐 Installing Chromium..."
sudo pacman -S --needed --noconfirm chromium

# 4. Install VS Code (Open Source Version)
echo "📝 Installing VS Code (Code - OSS)..."
sudo pacman -S --needed --noconfirm code

# 5. Install Yay (AUR Helper) if not present
if ! command -v yay &> /dev/null; then
    echo "🦜 Installing yay..."
    sudo pacman -S --needed --noconfirm yay
else
    echo "✅ yay is already installed."
fi

# 6. Install Antigravity (via AUR)
# Assuming 'antigravity' is the package name as mentioned by the user.
echo "🤖 Installing Antigravity..."
yay -S --needed --noconfirm antigravity

# 7. VS Code Extensions (Optional but recommended)
echo "🔌 Installing VS Code Extensions..."
# Check if code binary exists and install extensions
if command -v code &> /dev/null; then
    code --install-extension dbaeumer.vscode-eslint --force
    code --install-extension esbenp.prettier-vscode --force
    code --install-extension bradlc.vscode-tailwindcss --force
    code --install-extension dsznajder.es7-react-js-snippets --force
else
    echo "⚠️ VS Code not found in path, skipping extensions."
fi

echo "✨ Installation Complete! ✨"
echo "You can now start the workshop."
echo "verify installations with:"
echo "node -v"
echo "npm -v"
echo "code --version"
