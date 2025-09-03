---
sidebar_position: 5
---

# Automatic Upgrade

Kube-Hetzner provides automatic upgrade capabilities for both the underlying operating system (openSUSE MicroOS) and Kubernetes (k3s). These upgrades ensure your cluster stays secure and up-to-date with minimal manual intervention.

## How It Works

### MicroOS Upgrades

openSUSE MicroOS automatically upgrades itself using transactional updates. These updates are applied in the background and don't affect the running system until a reboot occurs. Kube-Hetzner integrates with [Kured](https://github.com/kubereboot/kured) to safely coordinate reboots across the cluster.

### k3s Upgrades

k3s automatically upgrades using Rancher's [system upgrade controller](https://github.com/rancher/system-upgrade-controller). This controller manages the upgrade process for both control plane and agent nodes, ensuring they're updated in a controlled manner.

## Default Settings

By default, both MicroOS and k3s automatic upgrades are enabled:

- **MicroOS**: Automatically upgrades to the latest rolling release
- **k3s**: Follows the `initial_k3s_channel` (typically stable)

## Configuring Update Timeframes

By default, nodes that have installed updates will reboot within the next few minutes. Kured can be configured with specific timeframes for rebooting to prevent too frequent drains and reboots.

All options from the [Kured documentation](https://kured.dev/docs/configuration/) are available for modification.

Important: Kured is also used to reboot nodes after configuration updates (`registries.yaml`, etc.), so configuration changes can take some time to propagate.

## Turning Off Automatic Upgrades

### For MicroOS

If you wish to turn off automatic MicroOS upgrades (important if you are not launching an HA setup that requires at least 3 control-plane nodes), you need to set:

```hcl
automatically_upgrade_os = false
```

Alternatively, SSH into each node and issue the following command:

```sh
systemctl --now disable transactional-update.timer
```

### For k3s

If you wish to turn off automatic k3s upgrades, you need to set:

```hcl
automatically_upgrade_k3s = false
```

Once disabled, you can selectively enable upgrades by setting the node label `k3s_update=true` and later disable it by removing the label or setting it to `false`:

```sh
# Enable upgrade for a node (use --all for all nodes)
kubectl label --overwrite node <node-name> k3s_upgrade=true

# Later disable upgrade by removing the label (use --all for all nodes)
kubectl label node <node-name> k3s_upgrade-
```

Alternatively, you can disable the k3s automatic upgrade without individually editing the labels on the nodes. Instead, you can just delete the two system controller upgrade plans:

```sh
kubectl delete plan k3s-agent -n system-upgrade
kubectl delete plan k3s-server -n system-upgrade
```

## Manual Upgrades

After turning off automatic upgrades, you'll need to manually upgrade the nodes when needed. You can do so by SSH'ing into each node and running:

```sh
systemctl start transactional-update.service
reboot
```

## Individual Components Upgrade

For rare cases where you need to upgrade individual components:

1. A backup of the kustomization is automatically downloaded to `kustomization_backup.yaml`
2. Create a duplicate named `kustomization.yaml`, keeping the original intact
3. Edit the `kustomization.yaml` file and update the links to the latest versions
4. Apply the updated configuration with `kubectl apply -k ./`