---
sidebar_position: 3
---

# TLS Example

This example shows how to set up TLS certificates using Cert-Manager with Let's Encrypt.

## Prerequisites

1. A domain name pointing to your cluster's load balancer
2. Cert-Manager enabled in your kube.tf:
   ```hcl
   cert_manager_enabled = true
   ```

## Creating a ClusterIssuer

Create a `cluster-issuer.yaml` file:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
```

Apply the ClusterIssuer:

```bash
kubectl apply -f cluster-issuer.yaml
```

## Creating a Certificate

Create a `certificate.yaml` file:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-com
  namespace: default
spec:
  secretName: example-com-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - example.com
  - www.example.com
```

Apply the Certificate:

```bash
kubectl apply -f certificate.yaml
```

## Using TLS in Ingress

Create an `ingress.yaml` file:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-app
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - example.com
    - www.example.com
    secretName: example-com-tls
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: example-app
            port:
              number: 80
```

Apply the Ingress:

```bash
kubectl apply -f ingress.yaml
```

## Verifying the Certificate

Check the certificate status:

```bash
kubectl get certificate example-com
```

Describe the certificate for more details:

```bash
kubectl describe certificate example-com
```

## Troubleshooting

If certificates are not being issued, check the cert-manager logs:

```bash
kubectl -n cert-manager logs -l app=cert-manager
```

Common issues:
1. DNS not pointing to the correct IP
2. Firewall blocking HTTP-01 challenge port (80)
3. Incorrect email or ACME server configuration
4. Rate limits from Let's Encrypt

This example demonstrates a complete TLS setup using Cert-Manager with Let's Encrypt for automatic certificate management.