---
sidebar_position: 2
---

# Terraform Configuration

This document provides details about the Terraform configuration for Kube-Hetzner.

## Requirements

| Name | Version |
|------|---------|
| terraform | >= 1.8.0 |
| assert | >= 0.16.0 |
| github | >= 6.4.0 |
| hcloud | >= 1.51.0 |
| local | >= 2.5.2 |
| ssh | 2.7.0 |

## Providers

| Name | Version |
|------|---------|
| cloudinit | n/a |
| github | >= 6.4.0 |
| hcloud | >= 1.51.0 |
| local | >= 2.5.2 |
| null | n/a |
| random | n/a |
| ssh | 2.7.0 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| agents | ./modules/host | n/a |
| control_planes | ./modules/host | n/a |

## Resources

The module creates the following resources in your Hetzner Cloud project:

### Hetzner Cloud Resources

- **Firewall**: Security groups for cluster access
- **Floating IPs**: Optional floating IPs for egress traffic
- **Load Balancers**: Control plane and agent load balancers
- **Network**: Private network for cluster communication
- **Network Routes**: Routing rules for the private network
- **Network Subnets**: Subnets for different node types
- **Placement Groups**: Anti-affinity groups for nodes
- **Primary IPs**: Public IPs for NAT routers
- **Reverse DNS**: DNS entries for your nodes
- **Servers**: Control plane and agent nodes
- **SSH Keys**: SSH keys for node access
- **Volumes**: Optional volumes for storage

### Local Resources

- **Files**: Configuration files generated locally
- **Sensitive Files**: Kubeconfig and other sensitive files
- **Null Resources**: Provisioning and configuration triggers

## Module Source

You can specify the module source in multiple ways:

### 1. Official Terraform Registry (Recommended)

```hcl
module "kube-hetzner" {
  source  = "kube-hetzner/kube-hetzner/hcloud"
  version = "2.15.3"  # Optional but recommended
  # ... other configuration
}
```

### 2. GitHub Repository

```hcl
module "kube-hetzner" {
  source = "github.com/kube-hetzner/terraform-hcloud-kube-hetzner"
  # ... other configuration
}
```

### 3. Local Development

```hcl
module "kube-hetzner" {
  source = "../../kube-hetzner/"  # Path to local git repo
  # ... other configuration
}
```