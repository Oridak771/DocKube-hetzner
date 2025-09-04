---
sidebar_position: 1
---

# SSH Configuration

Kube-Hetzner requires you to have a recent version of OpenSSH (>=6.5) installed on your client, and the use of a key-pair generated with one of the following algorithms:

- ssh-ed25519 (preferred, and most simple to use without passphrase)
- rsa-sha2-512
- rsa-sha2-256

## Using ssh-ed25519 Keys

If your key-pair is of the `ssh-ed25519` sort (useful command `ssh-keygen -t ed25519`), and without a passphrase, you do not need to do anything else. Just set `public_key` and `private_key` to their respective path values in your kube.tf file.

## Using Keys with Passphrases or Hardware Devices

Otherwise, for a key-pair with passphrase or a device like a Yubikey, make sure you have an SSH agent running and your key is loaded with:

```bash title="Terminal"
eval ssh-agent $SHELL
ssh-add ~/.ssh/my_private-key_id
```

Verify it is loaded with:

```bash title="Terminal"
ssh-add -l
```

Then set `private_key = null` in your kube.tf file, as it will be read from the ssh-agent automatically.

## SSH Port Configuration

You can customize the SSH port (by default 22) in your kube.tf:

```tf title="kube.tf"
ssh_port = 2222
```

## Additional SSH Keys

You can add additional SSH public Keys to grant other team members root access to your cluster nodes:

```tf title="kube.tf"
ssh_additional_public_keys = [
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...",
  "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
]
```

## Using Existing SSH Keys in Hetzner Cloud

If you want to use an ssh key that is already registered within hetzner cloud, you can pass its id:

```tf title="kube.tf"
hcloud_ssh_key_id = "123456"
```

If no id is passed, a new ssh key will be registered within hetzner cloud. It is important that exactly this key is passed via `ssh_public_key` & `ssh_private_key` variables.
