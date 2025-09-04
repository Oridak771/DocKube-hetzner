---
title: About
sidebar_label: About
sidebar_position: 1
---

# About

Kube-Hetzner is a Terraform module that creates a highly optimized Kubernetes installation on Hetzner Cloud. It's designed to be:

- **Easy to use**: Simple configuration with sensible defaults
- **Highly available**: Automatic HA setup with multiple control planes
- **Auto-upgradable**: Both the OS and Kubernetes automatically upgrade
- **Cost-effective**: Deployed for peanuts on Hetzner Cloud
- **Secure**: Built with security best practices in mind

## Features

- [x] **Maintenance-free** with auto-upgrades to the latest version of MicroOS and k3s.
- [x] **Multi-architecture support**, choose any Hetzner cloud instances, including the cheaper CAX ARM instances.
- [x] Proper use of the **Hetzner private network** to minimize latency.
- [x] Choose between **Flannel, Calico, or Cilium** as CNI.
- [x] Optional **Wireguard** encryption of the Kube network for added security.
- [x] **Traefik**, **Nginx** or **HAProxy** as ingress controller attached to a Hetzner load balancer with Proxy Protocol turned on.
- [x] **Automatic HA** with the default setting of three control-plane nodes and two agent nodes.
- [x] **Autoscaling** nodes via the [kubernetes autoscaler](https://github.com/kubernetes/autoscaler).
- [x] **Super-HA** with Nodepools for both control-plane and agent nodes that can be in different locations.
- [x] Possibility to have a **single node cluster** with a proper ingress controller.
- [x] Can use Klipper as an **on-metal LB** or the **Hetzner LB**.
- [x] Ability to **add nodes and nodepools** when the cluster is running.
- [x] Possibility to toggle **Longhorn** and **Hetzner CSI**.
- [x] Encryption at rest fully functional in both **Longhorn** and **Hetzner CSI**.
- [x] Optional use of **Floating IPs** for use via Cilium's Egress Gateway.
- [x] Proper IPv6 support for inbound/outbound traffic.
- [x] **Flexible configuration options** via variables and an extra Kustomization option.
- [x] Ability to add Hetzner "Robot" / Dedicated servers as nodes

_It uses Terraform to deploy as it's easy to use, and Hetzner has a great [Hetzner Terraform Provider](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs)._
