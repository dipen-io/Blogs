---
title: "My Developer Productivity Setup"
description: "How Void Linux, i3, tmux and Neovim make my development workflow fast and distraction-free."
pubDate: 2026-03-10
author: "Dinesh"
tags: ["linux", "productivity", "neovim", "tmux", "i3"]
---

# My Developer Productivity Setup

I have been using Linux for about three years now. My journey started with Arch Linux, which helped me understand how a Linux system works internally and gave me the freedom to customize everything.

Recently, I moved from Arch Linux to Void Linux because I wanted something minimal, fast, and independent from systemd. Over time, I built a development environment that focuses on simplicity and productivity.

As a developer, productivity is not only about writing code faster.  
It is about building an environment that removes distractions and gives you complete control over your workflow.

My current setup consists of:

    * Void Linux
    * i3 window manager
    * tmux
    * Neovim

This stack allows me to work in a fast, keyboard-driven environment without unnecessary distractions. In this post, I will share how this setup improves my productivity and why I prefer it for development.

In this blog, I will explain how my setup works and why it improves my productivity.

---

## Why I Use Void Linux

Void Linux is a minimal and independent Linux distribution. Unlike many other distributions, it does not use systemd.

Some reasons I prefer it:

- Very lightweight
- Fast boot time
- Simple package manager (`xbps`)
- No unnecessary background services

Because Void Linux is minimal, I can install only the tools I need. This keeps my system clean and fast.

---

## Window Management with i3

Instead of using a traditional desktop environment like GNOME or KDE, I use **i3**, a tiling window manager.

With i3:

- Windows automatically tile
- Everything is controlled with the keyboard
- No need to drag windows with the mouse

For example:

- `Alt + Enter` → open terminal
- `Alt + D` → open application launcher
- `Alt + J/K` → switch windows

This allows me to move between applications instantly without breaking my focus.

---

## Terminal Multiplexing with tmux

I spend most of my time in the terminal, so **tmux** is a critical tool in my workflow.

tmux allows me to:

- Split terminal windows
- Run multiple sessions
- Keep processes running in the background
- Reattach sessions later

Typical layout I use:

- Left: Code editor (Neovim)
- Right: Server logs
- Bottom: Git commands

Even if my terminal closes, my tmux session continues running.

---

## Coding with Neovim

For coding, I use **Neovim**.

Neovim is extremely powerful and customizable. With the right plugins, it becomes a full development environment.

My Neovim setup includes:

- LSP for autocompletion
- Syntax highlighting
- File explorer
- Git integration
- Fast keyboard navigation

Because Neovim is lightweight, it starts instantly and works perfectly even on low-memory systems.

---

## Why This Setup Improves My Productivity

This stack helps me in several ways:

1. **Speed**  
   My system uses very little RAM and CPU.

2. **Keyboard-driven workflow**  
   Almost everything can be done without touching the mouse.

3. **Less distraction**  
   No animations, popups, or unnecessary UI.

4. **Full control**  
   Every part of my environment is configurable.

---

## Final Thoughts

Your development environment has a huge impact on your productivity.

For me, the combination of:

- Void Linux
- i3 window manager
- tmux
- Neovim

creates a fast, minimal, and powerful workflow.

If you enjoy keyboard-driven development and lightweight tools, this setup might work well for you too.

---

Thanks for reading!
