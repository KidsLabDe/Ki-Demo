# Workshop Setup Guide

This guide helps you prepare Manjaro Linux laptops for the React/Kahoot workshop.

## 1. Run the Installation Script
Copy the `setup_workshop.sh` file to each laptop (or host it somewhere they can curl).

1. Open a terminal.
2. Make the script executable:
   ```bash
   chmod +x setup_workshop.sh
   ```
3. Run it:
   ```bash
   ./setup_workshop.sh
   ```

## 2. What it installs
- **System Updates**: Ensures the laptop is up to date.
- **Node.js & npm**: Required to run the React development environment.
- **Chromium**: Fast browser for testing (similar to Chrome).
- **VS Code**: The code editor we will use.
- **Git**: Version control.
- **Antigravity**: The AI coding assistant.
- **VS Code Extensions**: Installs useful plugins for React and Tailwind automatically.

## 3. Pre-Workshop Check
Before the students arrive, run these commands in a terminal to verifying everything is ready:

```bash
node -v   # Should show v18+ or v20+
npm -v    # Should show v9+
code -v   # Should launch or show version
```

## 4. Troubleshooting
- If `yay` fails, ensure the user has sudo rights.
- If Antigravity fails to install, check the AUR connectivity or install manually.
