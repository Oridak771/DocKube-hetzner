---
sidebar_position: 1
---

# Scaling Nodes

Two things can be scaled: the number of nodepools or the number of nodes in these nodepools.

## Limitations

There are some limitations (to scaling down mainly) that you need to be aware of:

Once the cluster is up:
- You can change any nodepool count and even set it to 0 (in the case of the first control-plane nodepool, the minimum is 1)
- You can rename a nodepool (if the count is to 0)
- You should not remove a nodepool from the list after once the cluster is up. That is due to how subnets and IPs get allocated. The only nodepools you can remove are those at the end of each list of nodepools.

However, you can freely:
- Add other nodepools at the end of each list
- Increase or decrease the node count for each nodepool (if you want to decrease a nodepool node count make sure you drain the nodes in question before, you can use `terraform show` to identify the node names at the end of the nodepool list, otherwise, if you do not drain the nodes before removing them, it could leave your cluster in a bad state)

The only nodepool that needs to have always at least a count of 1 is the first control-plane nodepool.

## Advanced Scaling with Individual Nodes

An advanced use case is to replace the `count` of a nodepool by a `nodes` map with each key representing a single node. This approach provides fine-grained control over individual nodes within a pool, allowing for per-node overrides of location, labels, taints, server type, and other parameters.

### Benefits

- **Heterogeneous Nodepools**: Mix different server types within the same nodepool
- **Fine-grained Labels and Taints**: Apply specific labels or taints to individual nodes
- **Placement Control**: Assign different placement groups or locations to specific nodes
- **Gradual Scaling**: Add or remove individual nodes without affecting others
- **Resource Optimization**: Tailor node specifications to specific workloads

### Configuration

Instead of using `count`, define a `nodes` map where each key is a unique identifier for the node:

```hcl
agent_nodepools = [
  {
    name        = "agent-large",
    server_type = "cx32",  # Default server type
    location    = "nbg1",  # Default location
    nodes = {
      "node-01" : {
        labels = ["my.extra.label=special"],
        placement_group = "agent-large-pg-1",
      },
      "node-02" : {
        server_type = "cx42",  # Override default server type
        labels = ["my.extra.label=slightlybiggernode"],
        taints = [
          {
            key    = "dedicated"
            value  = "gpu"
            effect = "NoSchedule"
          }
        ],
        placement_group = "agent-large-pg-2",
      },
      "node-03" : {
        location = "fsn1",  # Override default location
        labels = ["topology.kubernetes.io/zone=germany-fsn1"]
      },
    }
  },
]
```

### Node Management

- **Adding Nodes**: Add new entries to the `nodes` map
- **Removing Nodes**: Remove entries from the `nodes` map (ensure proper draining first)
- **Modifying Nodes**: Update the configuration for existing node keys
- **Scaling**: The number of nodes is determined by the number of entries in the map

### Important Notes

- Node keys should be unique within the nodepool
- When using `nodes`, the `count` parameter is ignored
- Individual node configurations override the nodepool defaults
- Ensure proper draining before removing nodes to avoid workload disruption
