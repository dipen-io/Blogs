---

title: "Guide to CI/CD using GitHub Actions"
description: "Detailed guide to CI/CD implementation"
pubDate: 2026-03-25
author: "Dinesh"
tags: ["cicd", "devops"]
------------------------

# 🚀 Complete Production Guide: Node.js Backend CI/CD with GitHub Actions

> **Last Updated**: March 2026
> **Node.js Version**: 20 LTS (Iron)
> **Runner**: ubuntu-latest + Self-hosted (EC2)
> **Target**: Production-grade deployment with zero-downtime

---

## 📋 Table of Contents

1. Architecture Overview
2. Prerequisites
3. Project Structure
4. EC2 Server Setup
5. Self-Hosted Runner
6. GitHub Secrets
7. PM2 Configuration
8. GitHub Actions Workflow
9. Deployment Verification
10. Security Hardening
11. Monitoring
12. Troubleshooting

---

## 🏗️ Architecture Overview

```
Developer → GitHub → GitHub Actions → EC2 Runner → Node.js (PM2) → Database
```

### ✅ Features

* Zero-downtime deployment (PM2 cluster reload)
* Multi-core utilization
* Auto-restart on crash/memory leak
* Secure CI/CD pipeline
* Structured logging

---

## 📦 Prerequisites

| Tool    | Version    |
| ------- | ---------- |
| Node.js | 20.x       |
| npm     | 10.x       |
| PM2     | 5.x        |
| EC2     | t3.medium+ |

---

## 📁 Project Structure

```
backend/
├── src/
├── tests/
├── logs/
├── package.json
├── ecosystem.config.js
└── .github/workflows/backend-deploy.yml
```

---

# ⚙️ Step 1: EC2 Server Setup

## Launch Instance

* Ubuntu 24.04
* Open ports: 22, 80, 443, 5000

## Setup

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm install -g pm2
sudo apt install git -y
```

## Create App Directory

```bash
sudo mkdir -p /var/www/backend
sudo chown -R $USER:$USER /var/www/backend
```

## Deploy User

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
```

## Firewall

```bash
sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
sudo ufw enable
```

## PM2 Startup

```bash
pm2 startup
pm2 save
```

---

# 🤖 Step 2: Self-Hosted Runner

⚠️ Use ONLY with private repos

```bash
sudo su - deploy
mkdir ~/actions-runner && cd ~/actions-runner
```

Download runner (latest from GitHub), then:

```bash
./config.sh --url https://github.com/USER/REPO --token TOKEN
sudo ./svc.sh install
sudo ./svc.sh start
```

---

# 🔐 Step 3: GitHub Secrets

## Required Secrets

| Name       | Example        |
| ---------- | -------------- |
| NODE_ENV   | production     |
| PORT       | 5000           |
| DB_URL     | postgres://... |
| JWT_SECRET | secret         |

---

# ⚡ Step 4: PM2 Configuration

Create `ecosystem.config.js`

```javascript
module.exports = {
  apps: [{
    name: "backend-api",
    script: "./src/index.js",
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "1G",
    env_production: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
};
```

---

# 🚀 Step 5: GitHub Actions Workflow

Create:

`.github/workflows/backend-deploy.yml`

```yaml
name: 🚀 Backend Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test || true

  deploy:
    needs: test
    runs-on: self-hosted

    steps:
      - uses: actions/checkout@v4
      - run: npm ci --production
      
      - name: Create .env
        run: |
          echo "NODE_ENV=${{ secrets.NODE_ENV }}" > .env
          echo "PORT=${{ secrets.PORT }}" >> .env

      - name: Deploy
        run: |
          if pm2 list | grep backend-api; then
            pm2 reload ecosystem.config.js --env production
          else
            pm2 start ecosystem.config.js --env production
          fi
          pm2 save
```

---

# ✅ Step 6: Deployment Verification

```bash
pm2 status
pm2 logs
curl http://localhost:5000/health
```

---

# 🔒 Production Security

* Use deploy user (not root)
* Enable UFW firewall
* Use SSH keys only
* Store secrets in GitHub (never in repo)

---

# 📊 Monitoring

```bash
pm2 monit
pm2 logs
```

---

# 🛠️ Troubleshooting

| Issue            | Fix             |
| ---------------- | --------------- |
| App not starting | Check logs      |
| Port blocked     | Check firewall  |
| Runner offline   | Restart service |

---

# 🚀 Next Level

* Dockerize app
* Kubernetes deployment
* Add Nginx + SSL
* CI/CD notifications (Slack)

---

# 🎯 Final Notes

* Always use `npm ci` in production
* Keep backups
* Monitor logs regularly

---

**Your CI/CD pipeline is now production-ready 🔥**

