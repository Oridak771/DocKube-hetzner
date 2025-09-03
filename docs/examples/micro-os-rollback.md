---
sidebar_position: 2
---

# Micro OS Rollback

This example shows how to handle MicroOS rollbacks in case of failed updates.

## Understanding MicroOS Snapshots

openSUSE MicroOS uses BTRFS snapshots for atomic updates. When an update is applied, a new snapshot is created. If the update fails or causes issues, you can rollback to a previous snapshot.

## Checking Available Snapshots

SSH into your node and check available snapshots:

```bash
sudo transactional-update list
```

This will show output similar to:

```
Available snapshots:
0 : clean root filesystem
1 : clean root filesystem
2 : clean root filesystem
3 : clean root filesystem
4 : clean root filesystem
5 : clean root filesystem
6 : clean root filesystem
7 : /etc overlay (current)
8 : /etc overlay
9 : /etc overlay
10 : /etc overlay
```

## Rolling Back to a Previous Snapshot

To rollback to a previous snapshot:

```bash
sudo transactional-update rollback 5
sudo reboot
```

Replace `5` with the snapshot number you want to rollback to.

## Forcing a Rollback

In case of a failed boot, you can force a rollback from the rescue system:

1. Boot into the rescue system
2. Mount the root filesystem:
   ```bash
   mount /dev/sda1 /mnt
   ```
3. List available snapshots:
   ```bash
   btrfs subvolume list /mnt
   ```
4. Set the default subvolume:
   ```bash
   btrfs subvolume set-default <subvolume-id> /mnt
   ```
5. Reboot the system

## Preventing Automatic Updates

If you need to prevent automatic updates for troubleshooting:

```bash
sudo systemctl disable --now transactional-update.timer
```

To re-enable:

```bash
sudo systemctl enable --now transactional-update.timer
```

## Best Practices

1. **Test Updates**: Before applying updates to production systems, test them on staging environments
2. **Monitor Rollbacks**: Keep track of when rollbacks occur and why
3. **Regular Snapshots**: Ensure snapshots are created regularly
4. **Backup Strategy**: Maintain external backups in addition to snapshot-based recovery