---
sidebar_position: 7
---

# Creating a Private Cluster with a NAT Router

Kube-Hetzner supports deploying fully private clusters where nodes do not have public IPs, enhancing security by isolating your cluster from the public internet.

## Overview

A private cluster uses a NAT (Network Address Translation) router to provide outbound internet access for nodes while keeping them inaccessible from the public internet. This is particularly useful for:

- Enhanced security posture
- Compliance requirements
- Cost optimization (no public IP charges for nodes)
- Internal-only workloads

## Prerequisites

To deploy a private cluster, you must set `use_control_plane_lb = true` in your configuration. This ensures the control plane is accessible via a load balancer.

## Configuration

### Enabling NAT Router

Set the `nat_router` variable to enable the NAT router:

```hcl
nat_router = {
  server_type = "cx22"
  location    = "nbg1"
}
```

### Parameters

- `server_type`: Hetzner Cloud server type for the NAT router (e.g., `cx22`, `cpx11`)
- `location`: Datacenter location for the NAT router (must match one of your node locations)

### Complete Example

```hcl
module "kube-hetzner" {
  # ... other configuration ...

  use_control_plane_lb = true

  nat_router = {
    server_type = "cx22"
    location    = "nbg1"
  }

  control_plane_nodepools = [
    {
      name        = "control-plane"
      server_type = "cx22"
      location    = "nbg1"
      count       = 3
    }
  ]

  agent_nodepools = [
    {
      name        = "agent"
      server_type = "cx22"
      location    = "nbg1"
      count       = 2
    }
  ]
}
```

## How It Works

1. **Network Setup**: A private network is created for all cluster nodes
2. **NAT Router**: A dedicated server acts as a NAT gateway, providing outbound internet access
3. **Routing**: All outbound traffic from nodes is routed through the NAT router
4. **Security**: Nodes have no public IPs, making them inaccessible from the internet

## Important Considerations

- **Cost**: The NAT router incurs additional server costs
- **Location**: The NAT router should be in the same location as your nodes for optimal performance
- **Load Balancer**: Required for control plane access when using private nodes
- **DNS**: Ensure your DNS points to the load balancer for API access

## Troubleshooting

If you encounter connectivity issues:

1. Verify the NAT router is running: `hcloud server list`
2. Check network routes on nodes
3. Ensure firewall rules allow necessary outbound traffic
4. Confirm the load balancer is properly configured for API access
