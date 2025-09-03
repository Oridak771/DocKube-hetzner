import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A highly optimized, easy-to-use, auto-upgradable, HA-default & Load-Balanced Kubernetes cluster powered by k3s-on-MicroOS">
      {/* Hero Section */}
      <section className="hero hero--primary">
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1 text--center">
              <h1 className="hero__title">Kube-Hetzner</h1>
              <p className="hero__subtitle">
                A highly optimized, easy-to-use, auto-upgradable, HA-default & Load-Balanced Kubernetes cluster
                powered by k3s-on-MicroOS and deployed for peanuts on{' '}
                <a href="https://hetzner.com" target="_blank">Hetzner Cloud</a> 
              </p>

              <div className="margin-top--lg margin-bottom--lg">
                <img
                  src="https://github.com/kube-hetzner/terraform-hcloud-kube-hetzner/raw/master/.images/kube-hetzner-logo.png"
                  alt="Kube-Hetzner Logo"
                  style={{width: '112px', height: '112px'}}
                />
              </div>

              <div className="margin-top--lg">
                <a className="button button--secondary button--lg" href="/kube-hetzner/docs/getting-started/prerequisites">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="padding-vert--xl">
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2>About The Project</h2>
              <p className="margin-bottom--lg">
                <a href="https://hetzner.com" target="_blank">Hetzner Cloud</a> is a good cloud provider that offers very affordable prices for cloud instances,
                with data center locations in both Europe and the US.
              </p>
              <p>
                This project aims to create a highly optimized Kubernetes installation that is easy to maintain, secure, and automatically upgrades both the nodes and Kubernetes.
                We aimed for functionality as close as possible to GKE's Auto-Pilot.{' '}
                <i>Please note that we are not affiliates of Hetzner, but we do strive to be an optimal solution for deploying and maintaining Kubernetes clusters on Hetzner Cloud.</i>
              </p>
              <p>
                To achieve this, we built up on the shoulders of giants by choosing{' '}
                <a href="https://en.opensuse.org/Portal:MicroOS" target="_blank">openSUSE MicroOS</a> as the base operating system and{' '}
                <a href="https://k3s.io/" target="_blank">k3s</a> as the k8s engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <HomepageFeatures />

      {/* Technical Details Section */}
      <section className="padding-vert--xl">
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <div className="padding-horiz--md">
                <h3>Why OpenSUSE MicroOS?</h3>
                <ul>
                  <li>Optimized container OS that is fully locked down, most of the filesystem is read-only!</li>
                  <li>Hardened by default with an automatic ban for abusive IPs on SSH for instance.</li>
                  <li>Evergreen release, your node will stay valid forever, as it piggybacks into OpenSUSE Tumbleweed's rolling release!</li>
                  <li>Automatic updates by default and automatic rollbacks if something breaks, thanks to its use of BTRFS snapshots.</li>
                  <li>Supports <a href="https://github.com/kubereboot/kured" target="_blank">Kured</a> to properly drain and reboot nodes in an HA fashion.</li>
                </ul>
              </div>
            </div>
            <div className="col col--6">
              <div className="padding-horiz--md">
                <h3>Why k3s?</h3>
                <ul>
                  <li>Certified Kubernetes Distribution, it is automatically synced to k8s source.</li>
                  <li>Fast deployment, as it is a single binary and can be deployed with a single command.</li>
                  <li>Comes with batteries included, with its in-cluster <a href="https://github.com/k3s-io/helm-controller" target="_blank">helm-controller</a>.</li>
                  <li>Easy automatic updates, via the <a href="https://github.com/rancher/system-upgrade-controller" target="_blank">system-upgrade-controller</a>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="padding-vert--xl hero hero--secondary">
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2>Ready to Get Started?</h2>
              <p className="margin-bottom--lg">
                Deploy your production-ready Kubernetes cluster on Hetzner Cloud in minutes.
              </p>
              <a className="button button--secondary button--lg" href="/kube-hetzner/docs/getting-started/prerequisites">
                Start Your Deployment
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
