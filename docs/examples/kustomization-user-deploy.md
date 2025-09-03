---
sidebar_position: 1
---

# Kustomization User Deploy

This example shows how to use Kustomize to deploy additional manifests to your cluster.

## Directory Structure

```
your-project/
├── kube.tf
└── extra-manifests/
    ├── kustomization.yaml.tpl
    ├── deployment.yaml
    ├── service.yaml
    └── configmap.yaml
```

## Kustomization Template

Create a `kustomization.yaml.tpl` file:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml
- configmap.yaml

configMapGenerator:
- name: app-config
  literals:
    - ENV=production
    - LOG_LEVEL=info

secretGenerator:
- name: app-secrets
  literals:
    - DB_PASSWORD=${db_password}
```

## Deployment Manifest

Create a `deployment.yaml` file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-app
  labels:
    app: example-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
    spec:
      containers:
      - name: example-app
        image: nginx:latest
        ports:
        - containerPort: 80
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
```

## Service Manifest

Create a `service.yaml` file:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: example-app
  labels:
    app: example-app
spec:
  selector:
    app: example-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

## ConfigMap Manifest

Create a `configmap.yaml` file:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    events {
      worker_connections 1024;
    }
    http {
      include /etc/nginx/mime.types;
      server {
        listen 80;
        location / {
          root /usr/share/nginx/html;
          index index.html;
        }
      }
    }
```

## Terraform Configuration

In your `kube.tf`, configure the extra kustomize parameters:

```hcl
extra_kustomize_parameters = {
  db_password = "supersecretpassword"
}
```

This example demonstrates how to use Kustomize to deploy a complete application with ConfigMaps, Secrets, Deployments, and Services to your Kube-Hetzner cluster.