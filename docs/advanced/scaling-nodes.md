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

An advanced use case is to replace the count of a nodepool by a map with each key representing a single node. In this case, you can add and remove individual nodes from a pool by adding and removing their entries in this map, and it allows you to set individual labels and other parameters on each node in the pool.

Example:

```hcl
agent_nodepools = [
  {
    name        = "agent-large",
    server_type = "cx32",
    location    = "nbg1",
    nodes = {
      "0" : {
        labels = ["my.extra.label=special"],
        placement_group = "agent-large-pg-1",
      },
      "1" : {
        server_type = "cx42",
        labels = ["my.extra.label=slightlybiggernode"]
        placement_group = "agent-large-pg-2",
      },
    }
  },
]
```