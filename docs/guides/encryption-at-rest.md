---
sidebar_position: 2
---

# Encryption at Rest

Kube-Hetzner supports encryption at rest for persistent volumes using both Longhorn and Hetzner CSI.

## Hetzner CSI Encryption

The easiest way to get encrypted volumes working is to use the new encryption functionality of hcloud csi itself.

### Create Encryption Secret

First, create a secret containing the encryption key:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: encryption-secret
  namespace: kube-system
stringData:
  encryption-passphrase: foobar
```

### Create Encrypted Storage Class

Then create a new storage class:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: hcloud-volumes-encrypted
provisioner: csi.hetzner.cloud
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  csi.storage.k8s.io/node-publish-secret-name: encryption-secret
  csi.storage.k8s.io/node-publish-secret-namespace: kube-system
```

## Longhorn Encryption

To get started with Longhorn encryption, use a cluster-wide key for all volumes:

### Create Encryption Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: longhorn-crypto
  namespace: longhorn-system
stringData:
  CRYPTO_KEY_VALUE: "I have nothing to hide."
  CRYPTO_KEY_PROVIDER: "secret"
  CRYPTO_KEY_CIPHER: "aes-xts-plain64"
  CRYPTO_KEY_HASH: "sha256"
  CRYPTO_KEY_SIZE: "256"
  CRYPTO_PBKDF: "argon2i"
```

### Create Encrypted Storage Class

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: longhorn-crypto-global
provisioner: driver.longhorn.io
allowVolumeExpansion: true
parameters:
  nodeSelector: "node-storage"
  numberOfReplicas: "1"
  staleReplicaTimeout: "2880" # 48 hours in minutes
  fromBackup: ""
  fsType: ext4
  encrypted: "true"
  # global secret that contains the encryption key that will be used for all volumes
  csi.storage.k8s.io/provisioner-secret-name: "longhorn-crypto"
  csi.storage.k8s.io/provisioner-secret-namespace: "longhorn-system"
  csi.storage.k8s.io/node-publish-secret-name: "longhorn-crypto"
  csi.storage.k8s.io/node-publish-secret-namespace: "longhorn-system"
  csi.storage.k8s.io/node-stage-secret-name: "longhorn-crypto"
  csi.storage.k8s.io/node-stage-secret-namespace: "longhorn-system"
```

## Enabling Encryption

To enable encryption in your kube.tf:

### For Hetzner CSI

```hcl
hetzner_csi_enabled = true
```

### For Longhorn

```hcl
longhorn_enabled = true
```

## Best Practices

1. **Key Management**: Store encryption keys securely using Kubernetes secrets or external key management systems
2. **Backup Keys**: Always backup your encryption keys to prevent data loss
3. **Key Rotation**: Implement a key rotation strategy for enhanced security
4. **Testing**: Test encryption thoroughly before deploying to production
5. **Performance**: Be aware that encryption may impact storage performance