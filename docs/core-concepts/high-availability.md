---
sidebar_position: 4
---

# High Availability

Kube-Hetzner is designed with high availability in mind. By default, it creates clusters with multiple control plane nodes to ensure no single point of failure.

## Default HA Configuration

The default configuration includes:

- **3 Control Plane Nodes**: Provides etcd quorum and API server redundancy
- **2 Agent Nodes**: Ensures application availability
- **Load Balancer**: Distributes traffic across control plane nodes
- **Automatic Failover**: Built-in redundancy for all critical components

## Etcd Quorum

Kubernetes uses etcd for storing cluster state. For etcd to function properly, it requires a quorum (majority) of nodes to be available. With 3 control plane nodes:

- Can tolerate 1 node failure and maintain quorum
- Requires an odd number of nodes (3, 5, 7, etc.)
- Never use an even number of control plane nodes

## Control Plane Load Balancing

Kube-Hetzner automatically creates a Hetzner Load Balancer that distributes traffic across all control plane nodes. This ensures:

- No single point of failure for API access
- Even distribution of API requests
- Automatic removal of unhealthy control plane nodes

## Automatic Upgrades and Reboots

One of the key features of Kube-Hetzner is automatic OS and Kubernetes upgrades. These are performed in a rolling fashion to maintain availability:

1. Nodes are drained of workloads
2. Node is upgraded/rebooted
3. Node is restored to service
4. Process repeats for next node

This ensures that only one node is down at any given time, maintaining cluster availability.

## Recommendations for HA

### Minimum Configuration
For production workloads, we recommend at least:
- 3 Control Plane Nodes
- 2 Agent Nodes
- Automatic upgrades enabled

### Scaling for Higher Availability
For mission-critical applications:
- 5 Control Plane Nodes (can tolerate 2 failures)
- Multiple Agent Nodepools across different locations
- Enable autoscaling for automatic capacity adjustment

## Disabling HA

If you need to reduce costs for development or testing, you can create a single-node cluster:

```hcl
# In your kube.tf
control_plane_nodepools = [
  {
    name        = "control-plane",
    server_type = "cx22",
    location    = "nbg1",
    count       = 1
  }
]

agent_nodepools = [
  {
    name        = "agent",
    server_type = "cx22",
    location    = "nbg1",
    count       = 1
  }
]
```

Note that single-node clusters:
- Do not provide high availability
- Should have automatic OS upgrades disabled
- Use the built-in k3s service load balancer instead of Hetzner LB