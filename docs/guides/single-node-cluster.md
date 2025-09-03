---
sidebar_position: 1
---

# Single Node Cluster

Running a development cluster on a single node without any high availability is also possible.

## Configuration

When setting up a single-node cluster:

1. Set `automatically_upgrade_os` to `false`, especially with attached volumes the automatic reboots won't work properly.
2. Use only one control plane node and one agent node:

```hcl
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

## Ingress Controller

In this configuration, we don't deploy an external load-balancer but use the default [k3s service load balancer](https://rancher.com/docs/k3s/latest/en/networking/#service-load-balancer) on the host itself and open up port 80 & 443 in the firewall (done automatically).

## Limitations

Single-node clusters:
- Do not provide high availability
- Should have automatic OS upgrades disabled
- Are not recommended for production workloads
- May have issues with persistent volumes

## Use Cases

Single-node clusters are ideal for:
- Development and testing
- Learning Kubernetes
- Resource-constrained environments
- Edge computing scenarios