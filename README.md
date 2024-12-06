# SleepBuddies <img src="client/public/logo2048.png" alt="logo" width="20"/>

[![CodeQL](https://github.com/CSE-110-FA24-Team-17/SleepBuddies/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/CSE-110-FA24-Team-17/SleepBuddies/actions/workflows/github-code-scanning/codeql)
![UnitTestsBadge](https://github.com/CSE-110-FA24-Team-17/SleepBuddies/actions/workflows/build_test_react.yml/badge.svg)

The Sleep Buddies webapp

Project for Team 17, UC San Diego CSE 110 Fall 2024

## Introduction

College students often have difficulty falling and getting good quality sleep. Our app allows our 
users to monitor their sleep schedule with weekly reports based on their sleep patterns. 
Additionally, the app also includes a white noise and meditation feature to help users relax and 
unwind before bedtime. To further support students, the app includes an alarm feature to remind them 
to maintain a consistent sleep routine. By addressing these challenges, this app aims to reduce the 
stress college students face because of lack of sleep / poor 
sleep.

## Requirements

This project uses React in Typescript, and requires `Node.js` and `npm`

To install **Node.js** and **npm** on your system, follow the instructions below based on your 
operating system.

Refer to [npm documentations](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for 
detailed installation instructions

### Installing npm on Linux

1. **Install Node.js and npm with your package manager:**

   For example, for debian based distros:
   ```bash
   sudo apt install nodejs
   sudo apt install npm 
   ```

    For RHEL bashed distros:
    ```bash
    sudo dnf install nodejs
    ```

### Installing npm on macOS:
1. **Install Homebrew (if not already installed):**
   Homebrew is a package manager for macOS. Open a terminal and run:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js and npm:**
   Once Homebrew is installed, use it to install Node.js (npm is bundled with Node.js):
   ```bash
   brew install node
   ```

3. **Verify Installation:**
   After installation, verify that both Node.js and npm were installed successfully by running:
   ```bash
   node -v
   npm -v
   ```

### Installing npm on Windows:
1. **Download Node.js:**
   Go to the official Node.js website: [https://nodejs.org/](https://nodejs.org/) and download the 
   latest stable version of Node.js for Windows.

2. **Run the Installer:**
   After downloading, run the installer and follow the instructions in the setup wizard. Ensure that 
   the option to install npm is selected during installation.

3. **Verify Installation:**
   After installation, open a command prompt and verify that both Node.js and npm were installed 
   successfully by running:
   ```bash
   node -v
   npm -v
   ```

## Running Locally

To run the project locally, please install dependencies and start both the server and the client 
with two terminal instances

To run the server:

```
cd server
npm install
npm start
```

To run the client:

```
cd client
npm install
npm start
```

By default, the client should be at `http://localhost:3000`, and the server should be at 
`http://localhost:8080`, please ensure that both the server and the client are running for the 
program to function
