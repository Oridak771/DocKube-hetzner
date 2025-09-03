---
sidebar_position: 3
---

# TLS Configuration

Setting up TLS certificates for your Kubernetes services is essential for production deployments.

## Using Cert-Manager (Recommended)

We advise you to use `Cert-Manager`, as it supports HA setups without requiring you to use the enterprise version of Traefik. The reason for that is that according to Traefik themselves, Traefik CE (community edition) is stateless, and it's not possible to run multiple instances of Traefik CE with LetsEncrypt enabled.

### Installing Cert-Manager

First, install Cert-Manager:

```hcl
# In your kube.tf
cert_manager_enabled = true
```

### Creating Issuers

Create your issuers as described in the [cert-manager documentation](https://cert-manager.io/docs/configuration/acme/).

### Ingress with TLS

In your Ingress definition, just mentioning the issuer as an annotation and giving a secret name will take care of instructing Cert-Manager to generate a certificate for it:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
    - hosts:
        - "*.example.com"
      secretName: example-com-letsencrypt-tls
  rules:
    - host: "*.example.com"
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

## Ingress-Nginx with HTTP Challenge

If you choose to use the HTTP challenge method with Ingress-Nginx, you need to add the following variable to your kube.tf:

```hcl
lb_hostname = "cluster.example.org"
```

You must set it to an FQDN that points to your LB address. This is to circumvent the known issue [cert-manager/cert-manager/issues/466](https://github.com/cert-manager/cert-manager/issues/466).

Alternatively, you can just use the DNS challenge, which does not require any additional tweaks to work.

## Traefik with TLS

If you're using Traefik as your ingress controller, you can configure TLS directly:

```hcl
traefik_values = <<EOT
ports:
  web:
    redirectTo: websecure
  websecure:
    tls:
      enabled: true
      options: "default"
certificatesResolvers:
  letsencrypt:
    acme:
      email: "your-email@example.com"
      storage: "/etc/traefik/acme/acme.json"
      httpChallenge:
        entryPoint: "web"
EOT
```

## Best Practices

1. **Use staging environment**: Test your certificate configuration with Let's Encrypt staging environment first
2. **Monitor certificate expiration**: Set up alerts for certificate expiration
3. **Secure private keys**: Store private keys securely and limit access
4. **Use strong ciphers**: Configure your ingress controller to use strong TLS ciphers
5. **Enable HSTS**: Add HSTS headers for additional security