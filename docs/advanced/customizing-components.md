---
sidebar_position: 3
---

# Customizing Cluster Components

Most cluster components of Kube-Hetzner are deployed with the Rancher [Helm Chart](https://rancher.com/docs/k3s/latest/en/helm/) yaml definition and managed by the Helm Controller inside k3s.

By default, we strive to give you optimal defaults, but if you wish, you can customize them.

## Helm Values Customization

For Traefik, Nginx, HAProxy, Rancher, Cilium, Traefik, and Longhorn, for maximum flexibility, we give you the ability to configure them even better via helm values variables (e.g. `cilium_values`, see the advanced section in the kube.tf.example for more).

### Example: Customizing Traefik

```hcl
traefik_values = <<EOT
ports:
  web:
    nodePort: 32080
  websecure:
    nodePort: 32443
providers:
  kubernetesIngress:
    publishedService:
      enabled: true
EOT
```

### Example: Customizing Longhorn

```hcl
longhorn_values = <<EOT
defaultSettings:
  backupTarget: "s3://backup-bucket@us-east-1/"
  backupTargetCredentialSecret: "aws-secret"
persistence:
  dataPath: "/var/lib/longhorn"
EOT
```

## Using Additional Manifests

If you need to install additional Helm charts or Kubernetes manifests that are not provided by default, you can easily do so by using [Kustomize](https://kustomize.io). This is done by creating one or more `extra-manifests/kustomization.yaml.tpl` files beside your `kube.tf`.

If you'd like to use a different folder name, you can configure it using the `extra_kustomize_folder` variable. By default, it is set to `extra-manifests`. This can be useful when working with multiple environments, allowing you to deploy different manifests for each one.

These files need to be valid `Kustomization` manifests, additionally supporting terraform templating! (The templating parameters can be passed via the `extra_kustomize_parameters` variable (via a map) to the module).

All files in the `extra-manifests` directory and its subdirectories including the rendered versions of the `*.yaml.tpl` will be applied to k3s with `kubectl apply -k` (which will be executed after and independently of the basic cluster configuration).

## Post-Install Actions

After the initial bootstrapping of your Kubernetes cluster, you might want to deploy applications using the same terraform mechanism. For many scenarios it is sufficient to create a `kustomization.yaml.tpl` file (see [Adding Extras](#adding-extras)). All applied kustomizations will be applied at once by executing a single `kubectl apply -k` command.

However, some applications that e.g. provide custom CRDs (e.g. [ArgoCD](https://argoproj.github.io/cd/)) need a different deployment strategy: one has to deploy CRDs first, then wait for the deployment, before being able to install the actual application. In the ArgoCD case, not waiting for the CRD setup to finish will cause failures. Therefore, an additional mechanism is available to support these kind of deployments. Specify `extra_kustomize_deployment_commands` in your `kube.tf` file containing a series of commands to be executed, after the `Kustomization` step finished:

```hcl
extra_kustomize_deployment_commands = <<-EOT
  kubectl -n argocd wait --for condition=established --timeout=120s crd/appprojects.argoproj.io
  kubectl -n argocd wait --for condition=established --timeout=120s crd/applications.argoproj.io
  kubectl apply -f /var/user_kustomize/argocd-projects.yaml
  kubectl apply -f /var/user_kustomize/argocd-application-argocd.yaml
EOT
```