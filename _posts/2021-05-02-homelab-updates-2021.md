---
title: Homelab Updates 2021
description: Still putting up with annoying Samba configs.
category:
    - homelab
    - tech
layout: post
---

Along with various networking changes, I've recently had a shuffle round of my self-hosted services and other bits in my homelab. I figured it would make a semi-interesting blog post.

## Plex Media Server

The first thing on the list is the Plex Media Server.

I'm currently a paying Plex Pass subscriber and am hosting Plex Media Server on a Raspberry Pi 4 with 8GB RAM (probably a little overkill for what I'm using it for but whatever).

![Plex](/assets/img/homelab-updates-2021/Plex_Ot1vAJCabm.png)
*Of course I'm listening to Coldplay.*

I have a bit of a love-hate relationship with my PMS; it's stupidly easy to maintain and generally works brilliantly as a little music streaming server for my CDs, but the unfinished nature to some elements of it (like [removing all my lyrics](https://forums.plex.tv/t/all-lyrics-have-disappeared), thanks Plex) and the fact they don't even offer support for Plexamp, which is labelled as a *premium* application for Plex Pass users, frustrates me incredibly.

I could rant and rave about Plex all day.

## Portainer + Docker

![Docker Containers](/assets/img/homelab-updates-2021/firefox_2eTUvlA4k9.png)
*The Docker containers I currently have running.*

Properly discovering the brilliance of Docker is what really got me back into self-hosting things.

In alphabetical order, here are the containers I have running currently:

- **phntxx/dashboard** - Mostly there for experimental reasons; I thought it might be interesting to have a dashboard for things, but I don't really use it.
- **gitea/gitea** - This is my Git server that I use for small projects that don't really matter or school work.
- **portainer/portainer-ce** - Docker web UI.
- **jc21/nginx-proxy-manager** - More on this later.
- **jetbrains/youtrack** - Again experimenting with things. JetBrains is cool.

## Nginx Proxy Manager

Until recently, I've been manually adding everything to my reverse proxy through regular Nginx config files. While this is perfectly fine, and works generally pretty well, I discovered Nginx Proxy Manager and decided it would make things so much simpler.

It handles everything: SSL, domains, the whole deal - it even runs as a Docker container! Now, basically everything hosted at home goes through it when I want to access it away from home.

## AdGuard Home

My requirements were an efficient adblocker that ran on the network and did what it needed to for me and my family without much maintenance, and initially Pi-hole was what I was going to use until a friend introduced me to AdGuard Home.

![AdGuard Home](/assets/img/homelab-updates-2021/firefox_2sl2FqJgZM.png)
*It's blocked that many requests in just 24 hours!*

From the few days I've been using it, it's been great. I hardly notice it's there, considering I use browser-based adblockers anyway, but for things like mobile devices it's brilliant. It blocks ads and trackers without blocking things that are needed; something Pi-hole and the built-in one on my router ended up doing with my limited testing.

## Finishing Up

This is just a small update to what I've been doing with my homelab recently. While no hardware has changed, I've tackled some of the annoying issues I had before with keeping things working and working well, and this update, albeit small, has helped with self-hosting things a lot.

In the future, I'm probably going to downsize. Right now, I'm using an annoying old HP SFF desktop as a Proxmox server and, while it works, it can be a pain to use. Proxmox is brilliant for virtualisation, but it falls a little bit short for file servers that work well and can be maintained easily.

I'm thinking of getting something like a small NUC to start with for virtualisation and file storage, and from there I might consider splashing out for a Synology; the UI is too tempting.

*Thanks to [Tom](https://trobinson.me) for proof-reading.*