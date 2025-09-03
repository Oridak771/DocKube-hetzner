---
sidebar_position: 3
---

# CNI (Container Network Interface)

The Container Network Interface (CNI) is responsible for networking between pods in your Kubernetes cluster. Kube-Hetzner supports three different CNI plugins:

## Flannel (Default)

Flannel is the default CNI plugin for Kube-Hetzner. It's simple, reliable, and lightweight. Flannel creates a flat network where all pods can communicate with each other regardless of which node they're on.

To use Flannel, no additional configuration is needed as it's the default.

## Calico

Calico is a more feature-rich networking solution that provides network policy enforcement in addition to basic networking. It's a good choice if you need advanced networking features or network security policies.

To use Calico, set the `cni_plugin` variable in your `kube.tf`:

```hcl
cni_plugin = "calico"
```

## Cilium

Cilium is the most advanced CNI plugin, offering powerful networking, security, and observability features. It uses eBPF for high-performance packet processing and provides advanced features like:

- Network policy enforcement
- Service mesh capabilities
- Hubble observability platform
- Transparent encryption
- Bandwidth management

To use Cilium, set the `cni_plugin` variable in your `kube.tf`:

```hcl
cni_plugin = "cilium"
```

### Cilium Configuration

As Cilium has many configuration options, Kube-Hetzner provides the `cilium_values` variable to configure Cilium with Helm values before deployment. See the [Cilium Helm values documentation](https://github.com/cilium/cilium/blob/master/install/kubernetes/cilium/values.yaml) for all available options.

Example configuration:

```hcl
cilium_values = <<EOT
ipam:
  mode: kubernetes
kubeProxyReplacement: true
routingMode: native
ipv4NativeRoutingCIDR: "10.0.0.0/8"
endpointRoutes:
  enabled: true
loadBalancer:
  acceleration: native
bpf:
  masquerade: true
egressGateway:
  enabled: true
MTU: 1450
EOT
```

### Cilium Hubble

Cilium Hubble provides deep visibility into your cluster's network traffic. To enable Hubble:

```hcl
cilium_hubble_enabled = true
```

To access the Hubble UI, you can either port-forward the service:

```bash
kubectl port-forward -n kube-system service/hubble-ui 12000:80
```

Or use the Cilium CLI:

```bash
cilium hubble ui
```

## Ingress Controllers

In addition to CNI plugins, Kube-Hetzner supports multiple ingress controllers for routing external traffic to your services:

### Traefik (Default)

Traefik is the default ingress controller, providing dynamic configuration and automatic service discovery.

### Nginx

Nginx Ingress Controller offers high performance and extensive customization options.

### HAProxy

HAProxy Ingress Controller provides advanced load balancing features and high availability.

To use a specific ingress controller, set the `ingress_controller` variable in your `kube.tf`:

```hcl
ingress_controller = "haproxy"
```
