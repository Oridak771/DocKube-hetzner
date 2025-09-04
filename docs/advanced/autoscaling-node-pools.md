---
sidebar_position: 2
---

# Autoscaling Node Pools

Kube-Hetzner supports autoscaling node pools powered by the Kubernetes [Cluster Autoscaler](https://github.com/kubernetes/autoscaler).

## Enabling Autoscaling

To enable autoscaling, add at least one map to the array of `autoscaler_nodepools` in your configuration:

```tf title="kube.tf"
autoscaler_nodepools = [
  {
    name        = "autoscaler-agent"
    server_type = "cx22"
    location    = "nbg1"
    min_count   = 1
    max_count   = 10
    labels = {
      "node.kubernetes.io/type" = "autoscaler"
    }
    taints = [
      {
        key    = "dedicated"
        value  = "autoscaler"
        effect = "NoSchedule"
      }
    ]
  }
]
```

**Note:** The old `autoscaler_labels` and `autoscaler_taints` variables are deprecated. Use the `labels` map and `taints` list of objects directly within the `autoscaler_nodepools` block as shown above.

## Important Considerations

The nodes are booted based on a snapshot that is created from the initial control_plane. So please ensure that the disk of your chosen server type is at least the same size (or bigger) as the one of the first control_plane.

## Configuration Options

### Required Parameters

- `name`: Name of the nodepool
- `server_type`: Hetzner Cloud server type
- `location`: Datacenter location
- `min_count`: Minimum number of nodes
- `max_count`: Maximum number of nodes

### Optional Parameters

- `labels`: Labels to apply to nodes
- `taints`: Taints to apply to nodes
- `instance_type`: Specific instance type (alternative to server_type)
- `placement_group`: Placement group for the nodes

## Autoscaler Configuration

You can configure additional autoscaler settings:

```tf title="kube.tf"
autoscaler_enabled = true
autoscaler_scale_down_enabled = true
autoscaler_scale_down_delay = "10m"
autoscaler_scale_down_unneeded_time = "10m"
```

## Monitoring Autoscaler

To monitor the autoscaler, check the logs of the autoscaler pod:

```bash title="Terminal"
kubectl -n kube-system logs -l app=cluster-autoscaler
```

## Best Practices

1. **Set appropriate limits**: Choose min_count and max_count based on your workload requirements
2. **Use labels and taints**: Properly label autoscaled nodes for workload scheduling
3. **Monitor costs**: Keep an eye on the number of nodes to control costs
4. **Test scaling**: Test both scale-up and scale-down scenarios to ensure proper behavior
