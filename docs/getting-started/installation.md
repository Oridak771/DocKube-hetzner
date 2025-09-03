---
sidebar_position: 2
---

# Installation

## Creating your kube.tf file and the OpenSUSE MicroOS snapshot

1. Create a project in your [Hetzner Cloud Console](https://console.hetzner.cloud/), and go to **Security > API Tokens** of that project to grab the API key, it needs to be Read & Write. Take note of the key! ✅
2. Generate a passphrase-less ed25519 SSH key pair for your cluster; take note of the respective paths of your private and public keys. Or, see our detailed [SSH options](../configuration/ssh.md). ✅
3. Now navigate to where you want to have your project live and execute the following command, which will launch an **interactive script** to guide you through creating a new project folder, generating your `kube.tf` file, and optionally creating the required MicroOS snapshot. ✅

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

   The interactive script will:
   - Prompt you for your Hetzner Cloud API token
   - Ask if you want to create a new MicroOS snapshot (recommended for new users)
   - Generate a customized `kube.tf` file based on your inputs
   - Set up the necessary Packer configuration if creating a snapshot
   - Create the project directory and initialize it

4. In the newly created project folder, you'll find your `kube.tf` file, which has been pre-configured with your settings. Review and customize it further as needed. ✅

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
