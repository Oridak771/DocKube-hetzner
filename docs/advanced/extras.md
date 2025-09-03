---
sidebar_position: 4
---

# Adding Extras

If you need to install additional Helm charts or Kubernetes manifests that are not provided by default, you can easily do so by using [Kustomize](https://kustomize.io). This is done by creating one or more `extra-manifests/kustomization.yaml.tpl` files beside your `kube.tf`.

## Directory Structure

Create an `extra-manifests` directory in your project folder:

```
your-project/
├── kube.tf
└── extra-manifests/
    ├── kustomization.yaml.tpl
    ├── deployment.yaml
    └── service.yaml
```

## Kustomization Template

Create a `kustomization.yaml.tpl` file in your `extra-manifests` directory:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml

configMapGenerator:
- name: app-config
  literals:
    - APP_ENV=production
    - DATABASE_URL=${database_url}
```

Note the `${database_url}` variable which can be passed through Terraform.

## Passing Template Variables

You can pass variables to your kustomization templates using the `extra_kustomize_parameters` variable:

```hcl
extra_kustomize_parameters = {
  database_url = "postgresql://user:pass@db:5432/myapp"
  app_version  = "v1.2.3"
}
```

## Custom Folder Name

If you'd like to use a different folder name, you can configure it using the `extra_kustomize_folder` variable:

```hcl
extra_kustomize_folder = "my-custom-manifests"
```

This can be useful when working with multiple environments, allowing you to deploy different manifests for each one.

## Advanced Deployment Commands

For applications that require custom deployment steps (like waiting for CRDs), you can specify `extra_kustomize_deployment_commands`:

```hcl
extra_kustomize_deployment_commands = <<-EOT
  kubectl -n argocd wait --for condition=established --timeout=120s crd/appprojects.argoproj.io
  kubectl -n argocd wait --for condition=established --timeout=120s crd/applications.argoproj.io
  kubectl apply -f /var/user_kustomize/argocd-projects.yaml
EOT
```

## Helm Charts with Kustomize

You can also use Kustomize to deploy Helm charts:

```yaml
# kustomization.yaml.tpl
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

helmCharts:
- name: prometheus
  repo: https://prometheus-community.github.io/helm-charts
  version: 15.0.0
  releaseName: prometheus
  namespace: monitoring
  valuesFile: prometheus-values.yaml
```

## Terraform Integration

All files in the `extra-manifests` directory and its subdirectories including the rendered versions of the `*.yaml.tpl` will be applied to k3s with `kubectl apply -k` (which will be executed after and independently of the basic cluster configuration).