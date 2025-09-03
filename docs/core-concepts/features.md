---
sidebar_position: 2
---

# Features

Kube-Hetzner comes with a rich set of features that make it a powerful and flexible solution for deploying Kubernetes clusters on Hetzner Cloud.

## Maintenance and Upgrades

- **Auto-upgrades**: Both MicroOS and k3s automatically upgrade to keep your cluster secure and up-to-date
- **Rolling updates**: Zero-downtime upgrades with proper node draining and rebooting
- **Automatic rollbacks**: BTRFS snapshots ensure that failed updates automatically roll back

## Architecture Support

- **Multi-architecture**: Supports both x86 and ARM instances (CAX series)
- **Flexible node types**: Choose from any Hetzner Cloud instance type for your nodes

## Networking

- **Private network**: All inter-node communication happens over Hetzner's private network
- **Multiple CNI options**: Choose between Flannel, Calico, or Cilium
- **Wireguard encryption**: Optional encryption of the Kubernetes network
- **IPv6 support**: Full IPv6 support for both inbound and outbound traffic

## Ingress Controllers

- **Multiple options**: Traefik, Nginx, or HAProxy
- **Load balancer integration**: Automatically attaches to Hetzner Load Balancers with Proxy Protocol

## High Availability

- **Default HA**: Three control-plane nodes and two agent nodes by default
- **Super-HA**: Nodepools for both control-plane and agent nodes in different locations
- **Automatic failover**: Built-in redundancy and failover mechanisms

## Scaling

- **Manual scaling**: Easily add or remove nodes from existing nodepools
- **Autoscaling**: Kubernetes Cluster Autoscaler integration for automatic node scaling
- **Flexible nodepools**: Create and manage multiple nodepools with different configurations

## Storage

- **Longhorn support**: Built-in support for Longhorn distributed block storage
- **Hetzner CSI**: Integration with Hetzner Cloud Volumes via CSI driver
- **Encryption at rest**: Full encryption support for both storage solutions

## Security

- **MicroOS base**: Immutable, read-only filesystem for enhanced security
- **Automatic IP banning**: SSH brute force protection built into MicroOS
- **SELinux support**: Enhanced security with SELinux profiles

## Customization

- **Kustomize integration**: Easy customization of cluster components
- **Helm support**: Built-in Helm controller for managing applications
- **Flexible configuration**: Extensive variables for customizing every aspect