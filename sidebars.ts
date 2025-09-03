import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/prerequisites',
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/about',
        'core-concepts/features',
        'core-concepts/cni',
        'core-concepts/high-availability',
        'core-concepts/automatic-upgrade',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/ssh',
        'configuration/terraform',
        'configuration/variables',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Usage',
      items: [
        'advanced/scaling-nodes',
        'advanced/autoscaling-node-pools',
        'advanced/customizing-components',
        'advanced/extras',
        'advanced/debugging',
        'advanced/takedown',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/single-node-cluster',
        'guides/encryption-at-rest',
        'guides/tls',
        'guides/backup-restore',
      ],
    },
  ],
  
  examplesSidebar: [
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/kustomization-user-deploy',
        'examples/micro-os-rollback',
        'examples/tls',
      ],
    },
  ],
};

export default sidebars;
