---
sidebar_position: 5
---

# Deploying and Managing with Rancher

Kube-Hetzner provides seamless integration with Rancher Manager, allowing you to deploy and manage your Kubernetes clusters through Rancher's web-based interface.

## Overview

Rancher is a complete software stack for teams adopting containers. It addresses the operational and security challenges of managing multiple Kubernetes clusters across any infrastructure.

## Prerequisites

- **Powerful Control Plane Nodes**: Rancher requires at least 4GB of RAM per control plane node
- **DNS Configuration**: You need a domain name pointing to your cluster's load balancer
- **SSL Certificate**: Rancher requires HTTPS, so ensure you have TLS configured

## Configuration

### Enabling Rancher

Set the `enable_rancher` variable to deploy Rancher Manager:

```hcl
enable_rancher = true
rancher_hostname = "rancher.example.com"
rancher_bootstrap_password = "your-secure-password"
```

### Required Variables

- `rancher_hostname`: The fully qualified domain name for Rancher (must have DNS pointing to your load balancer)
- `rancher_bootstrap_password`: Initial password for the Rancher admin user

### Optional Variables

- `rancher_install_channel`: Rancher installation channel (default: `latest`)
- `rancher_values`: Custom Helm values for Rancher deployment

### Complete Example

```hcl
module "kube-hetzner" {
  # ... other configuration ...

  enable_rancher = true
  rancher_hostname = "rancher.mycompany.com"
  rancher_bootstrap_password = "ChangeMe123!"
  rancher_install_channel = "stable"

  control_plane_nodepools = [
    {
      name        = "control-plane"
      server_type = "cx31"  # At least 4GB RAM required
      location    = "nbg1"
      count       = 3
    }
  ]

  # Ensure TLS is configured
  ingress_controller = "traefik"
  traefik_values = <<EOT
ingressClass:
  enabled: true
  isDefaultClass: true
EOT
}
```

## Installation Process

1. **Deploy Cluster**: Terraform will deploy your Kubernetes cluster with Rancher
2. **DNS Setup**: Point your `rancher_hostname` to the cluster's load balancer IP
3. **SSL Certificate**: Rancher will automatically provision a Let's Encrypt certificate if configured
4. **Access Rancher**: Navigate to `https://rancher_hostname` and log in with `admin` and your bootstrap password

## Rancher Configuration

### Custom Helm Values

You can customize Rancher deployment using the `rancher_values` variable:

```hcl
rancher_values = <<EOT
replicas: 3
ingress:
  tls:
    source: "letsEncrypt"
    letsEncrypt:
      email: "admin@example.com"
EOT
```

### Installation Channels

- `latest`: Latest stable release
- `stable`: Previous stable release
- `alpha`: Alpha releases (not recommended for production)

## Post-Installation

### First Login

1. Open `https://rancher_hostname` in your browser
2. Accept the self-signed certificate warning (if using self-signed)
3. Log in with username `admin` and your `rancher_bootstrap_password`
4. Change the default password when prompted

### Adding Clusters

Rancher can manage:
- The local cluster (automatically imported)
- Additional Kubernetes clusters
- Imported clusters from other providers

## Troubleshooting

### Common Issues

1. **Insufficient RAM**: Ensure control plane nodes have at least 4GB RAM
2. **DNS Resolution**: Verify `rancher_hostname` resolves to the load balancer
3. **SSL Issues**: Check TLS configuration and certificate validity
4. **Bootstrap Password**: Ensure the password meets Rancher's requirements

### Logs

Check Rancher logs:

```bash
kubectl logs -n cattle-system deployment/rancher
```

### Resetting Rancher

If you need to reset Rancher:

```bash
kubectl delete namespace cattle-system
# Then re-run Terraform apply
```

## Best Practices

1. **Use External Database**: For production, configure an external database for Rancher
2. **Backup Regularly**: Implement regular backups of Rancher and cluster data
3. **Monitor Resources**: Keep an eye on control plane resource usage
4. **Security**: Use strong passwords and enable multi-factor authentication
5. **Updates**: Keep Rancher updated to the latest stable version
