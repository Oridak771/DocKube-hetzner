---
sidebar_position: 6
---

# Takedown

If you want to take down the cluster, you can proceed as follows:

## Standard Takedown

```bash
terraform destroy -auto-approve
```

## Handling Stuck Destruction

If you see the destroy hanging, it's probably because of the Hetzner LB and the autoscaled nodes. You can use the following command to delete everything (dry run option is available don't worry, and it will only delete resources specific to your cluster):

```bash
tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/cleanup.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"
```

As a one time thing, for convenience, you can also save it as an alias in your shell config file, like so:

```bash
alias cleanupkh='tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/cleanup.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"'
```

## Important Notes

- The cleanup script will delete everything, including volumes in your projects
- You can always try with a dry run, it will give you that option
- Make sure to backup any important data before takedown
- Delete any manually created resources that are not managed by Terraform

## Manual Cleanup

If the automated approaches don't work, you can manually delete resources through the Hetzner Cloud Console:

1. Load Balancers
2. Servers (nodes)
3. Networks
4. Volumes
5. SSH Keys
6. Floating IPs

## Data Retention

By default, the following data will be lost during takedown:

- All Kubernetes workloads
- Persistent volumes (unless backed up)
- Cluster configuration
- Network configuration

If you need to retain data, make sure to:

1. Backup persistent volumes
2. Export important configurations
3. Document your setup for recreation