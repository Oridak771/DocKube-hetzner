---
sidebar_position: 3
---

# Variables

This document describes the key variables you can configure in your `kube.tf` file. These variables control various aspects of your Kubernetes cluster deployment.

## Required Variables

### hcloud_token

Your Hetzner Cloud API token. Can be specified directly or through the `TF_VAR_hcloud_token` environment variable.

```hcl
hcloud_token = "your-hcloud-token"
```

### ssh_public_key

Path to your SSH public key file.

```hcl
ssh_public_key = file("~/.ssh/id_ed25519.pub")
```

### ssh_private_key

Path to your SSH private key file. Set to `null` when using ssh-agent for Yubikey-like device authentication or SSH key-pair with a passphrase.

```hcl
ssh_private_key = file("~/.ssh/id_ed25519")
```

## Network Configuration

### network_region

Hetzner Cloud region for your network. Change to `us-east` if location is `ash`.

Default: `eu-central`

```hcl
network_region = "eu-central"
```

### existing_network_id

If you want to create the private network before calling this module, you can do so and pass its id here. Useful for advanced scenarios like using a proxy that only listens on your private network.

NOTE: Must be a list of length 1.

```hcl
existing_network_id = [hcloud_network.your_network.id]
```

### network_ipv4_cidr

CIDR for the private network. Highly advised against changing this.

Default: `10.0.0.0/8`

```hcl
network_ipv4_cidr = "10.0.0.0/8"
```

## Cluster Configuration

### cluster_ipv4_cidr

CIDR for the cluster network. Never change this value after initializing a cluster.

Default: `10.42.0.0/16`

```hcl
cluster_ipv4_cidr = "10.42.0.0/16"
```

### service_ipv4_cidr

CIDR for the service network. Never change this value after initializing a cluster.

Default: `10.43.0.0/16`

```hcl
service_ipv4_cidr = "10.43.0.0/16"
```

### cluster_dns_ipv4

IP address for CoreDNS service. Never change this value after initializing a cluster.

Default: `10.43.0.10`

```hcl
cluster_dns_ipv4 = "10.43.0.10"
```

## Node Configuration

### control_plane_nodepools

Configuration for control plane nodepools. For HA, you need at least 3 nodes (must be an odd number).

```hcl
control_plane_nodepools = [
  {
    name        = "control-plane",
    server_type = "cx22",
    location    = "nbg1",
    count       = 3
  }
]
```

### agent_nodepools

Configuration for agent nodepools.

```hcl
agent_nodepools = [
  {
    name        = "agent",
    server_type = "cx22",
    location    = "nbg1",
    count       = 2
  }
]
```

## CNI Configuration

### cni_plugin

Choose between Flannel, Calico, or Cilium as CNI.

Default: `flannel`

```hcl
cni_plugin = "cilium"
```

### cilium_values

Helm values for Cilium configuration.

```hcl
cilium_values = <<EOT
ipam:
  mode: kubernetes
kubeProxyReplacement: true
EOT
```

## Feature Flags

### automatically_upgrade_os

Enable/disable automatic MicroOS upgrades.

Default: `true`

```hcl
automatically_upgrade_os = true
```

### automatically_upgrade_k3s

Enable/disable automatic k3s upgrades.

Default: `true`

```hcl
automatically_upgrade_k3s = true
```

### cilium_hubble_enabled

Enable/disable Cilium Hubble.

Default: `false`

```hcl
cilium_hubble_enabled = true
```

## Advanced Configuration

### ssh_port

Custom SSH port.

Default: `22`

```hcl
ssh_port = 2222
```

### ssh_additional_public_keys

Additional SSH public keys for node access.

```hcl
ssh_additional_public_keys = [
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI..."
]
```

### extra_kustomize_folder

Folder for additional kustomize manifests.

Default: `extra-manifests`

```hcl
extra_kustomize_folder = "extra-manifests"
```

This is just a selection of the most commonly used variables. For a complete reference, see the `variables.tf` file in the repository.