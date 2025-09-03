---
sidebar_position: 1
---

# Prerequisites

First and foremost, you need to have a Hetzner Cloud account. You can sign up for free [here](https://hetzner.com/cloud/).

Then you'll need to have [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) or [tofu](https://opentofu.org/docs/intro/install/), [packer](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli#installing-packer) (for the initial snapshot creation only, no longer needed once that's done), [kubectl](https://kubernetes.io/docs/tasks/tools/) cli and [hcloud](https://github.com/hetznercloud/cli) the Hetzner cli for convenience.  

The easiest way is to use the [homebrew](https://brew.sh/) package manager to install them (available on MacOS, Linux and Windows Linux Subsystem). The timeout command is also used, which is part of coreutils on MacOS.

|        **Tool**        |                              **Installation Command**                              |
|:----------------------:|:----------------------------------------------------------------------------------:|
| Homebrew (macOS/Linux) | brew install terraform packer kubectl hcloud                                       |
| Yay/Paru (Arch-based)  | yay -S terraform packer kubectl hcloud<br /> paru -S terraform packer kubectl hcloud |
| APT (Debian-based)     | sudo apt install terraform packer kubectl                                          |
| DNF (Red Hat-based)    | sudo dnf install terraform packer kubectl                                          |
| Snap                   | sudo snap install terraform kubectl --classic && snap install packer               |
| Chocolatey (Windows)   | choco install terraform packer kubernetes-cli hetzner-cli                          |