---
sidebar_position: 2
---

# Installation

## Creating your kube.tf file and the OpenSUSE MicroOS snapshot

1. Create a project in your [Hetzner Cloud Console](https://console.hetzner.cloud/), and go to **Security > API Tokens** of that project to grab the API key, it needs to be Read & Write. Take note of the key! ✅
2. Generate a passphrase-less ed25519 SSH key pair for your cluster; take note of the respective paths of your private and public keys. Or, see our detailed [SSH options](../configuration/ssh.md). ✅
3. Now navigate to where you want to have your project live and execute the following command, which will help you get started with a **new folder** along with the required files, and will propose you to create a needed MicroOS snapshot. ✅

   ```sh
   tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"
   ```

   Or for fish shell:

   ```fish
   set tmp_script (mktemp); curl -sSL -o "{tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh; chmod +x "{tmp_script}"; bash "{tmp_script}"; rm "{tmp_script}"
   ```

   _Optionally, for future usage, save that command as an alias in your shell preferences, like so:_

   ```sh
   alias createkh='tmp_script=$(mktemp) && curl -sSL -o "${tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh && chmod +x "${tmp_script}" && "${tmp_script}" && rm "${tmp_script}"'
   ```

   Or for fish shell:

   ```fish
   alias createkh='set tmp_script (mktemp); curl -sSL -o "{tmp_script}" https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/scripts/create.sh; chmod +x "{tmp_script}"; bash "{tmp_script}"; rm "{tmp_script}"'
   ```

   _For the curious, here is what the script does:_

   ```sh
   mkdir /path/to/your/new/folder
   cd /path/to/your/new/folder
   curl -sL https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/kube.tf.example -o kube.tf
   curl -sL https://raw.githubusercontent.com/kube-hetzner/terraform-hcloud-kube-hetzner/master/packer-template/hcloud-microos-snapshots.pkr.hcl -o hcloud-microos-snapshots.pkr.hcl
   export HCLOUD_TOKEN="your_hcloud_token"
   packer init hcloud-microos-snapshots.pkr.hcl
   packer build hcloud-microos-snapshots.pkr.hcl
   hcloud context create <project-name>
   ```

4. In that new project folder that gets created, you will find your `kube.tf` and it must be customized to suit your needs. ✅

   _A complete reference of all inputs, outputs, modules etc. can be found in the [terraform.md](../configuration/terraform.md) file._

## Installation

Now that you have your `kube.tf` file, along with the OS snapshot in Hetzner project, you can start the installation process:

```sh
cd <your-project-folder>
terraform init --upgrade
terraform validate
terraform apply -auto-approve
```

It will take around 5 minutes to complete, and then you should see a green output confirming a successful deployment.

_Once you start with Terraform, it's best not to change the state of the project manually via the Hetzner UI; otherwise, you may get an error when you try to run terraform again for that cluster (when trying to change the number of nodes for instance). If you want to inspect your Hetzner project, learn to use the hcloud cli._