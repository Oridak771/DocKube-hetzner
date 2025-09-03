---
sidebar_position: 5
---

# Debugging

Debugging a Kubernetes cluster can be challenging. This guide provides several approaches to help you diagnose and resolve issues with your Kube-Hetzner cluster.

## Using the Hetzner CLI

First and foremost, it's always good to have a quick look into Hetzner quickly without logging in to the UI. That is where the `hcloud` cli comes in.

### Setup

Activate it with `hcloud context create Kube-hetzner`; it will prompt for your Hetzner API token, paste that, and hit `enter`.

### Useful Commands

- Check the nodes: `hcloud server list`
- Check the network: `hcloud network describe k3s`
- Check the load balancer: `hcloud loadbalancer describe k3s-traefik`

## SSH Access to Nodes

To log in to your cluster via SSH, use:

```bash
ssh root@<control-plane-ip> -i /path/to/private_key -o StrictHostKeyChecking=no
```

### Checking Node Status

For control-plane nodes, use:
```bash
journalctl -u k3s
```

For agent nodes, use:
```bash
journalctl -u k3s-agent
```

### Inspecting Configuration

Check the k3s configuration:
```bash
cat /etc/rancher/k3s/config.yaml
```

### Checking Reboot Times

See when the previous reboot took place:
```bash
last reboot
uptime
```

## Kubernetes Debugging

### Check Cluster Status

```bash
kubectl cluster-info
kubectl get nodes
kubectl get pods -A
```

### Check System Components

```bash
kubectl get pods -n kube-system
kubectl logs -n kube-system -l app=kube-dns
```

### Check CNI Status

For Cilium:
```bash
kubectl -n kube-system exec --stdin --tty cilium-xxxx -- cilium status
```

## Common Issues and Solutions

### Nodes Not Ready

1. Check if nodes are accessible via SSH
2. Check k3s service status: `systemctl status k3s` or `systemctl status k3s-agent`
3. Check logs: `journalctl -u k3s` or `journalctl -u k3s-agent`
4. Check network connectivity between nodes

### Pods Stuck in Pending

1. Check resource availability: `kubectl describe nodes`
2. Check pod events: `kubectl describe pod <pod-name>`
3. Check for taints/tolerations mismatches

### Ingress Not Working

1. Check load balancer status in Hetzner Cloud Console
2. Check ingress controller pods: `kubectl get pods -n traefik` (or nginx/contour)
3. Check ingress resources: `kubectl get ingress`
4. Check service endpoints: `kubectl get endpoints <service-name>`

### Storage Issues

For Longhorn:
```bash
kubectl -n longhorn-system get volumes
kubectl -n longhorn-system get nodes
```

For Hetzner CSI:
```bash
kubectl get csinodes
kubectl get csidrivers
```

## Advanced Debugging

### Enable Debug Logging

Add to your kube.tf:
```hcl
k3s_exec_server_args = "--debug"
k3s_exec_agent_args = "--debug"
```

### Check System Resources

```bash
df -h  # Disk usage
free -m  # Memory usage
top  # CPU usage
```

### Network Diagnostics

```bash
ip a  # Network interfaces
ip r  # Routing table
ping <other-node-ip>  # Connectivity test
```

### SELinux Issues

Check for SELinux denials:
```bash
ausearch -m avc -ts recent
```

Rather than weakening SELinux modules for all workloads on your cluster, it's better to create a profile and apply it to a specific workload using the `udica` tool (pre-installed on MicroOS nodes).