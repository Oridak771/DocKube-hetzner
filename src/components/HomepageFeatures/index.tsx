import type {ReactNode} from 'react';
import {clsx} from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Auto-Upgradable',
    image: require('@site/static/img/Auto-Upgradable.png').default,
    description: (
      <>
        Automatic updates for both Kubernetes and nodes with built-in rollback
        capabilities using BTRFS snapshots.
      </>
    ),
  },
  {
    title: 'Highly Optimized',
    image: require('@site/static/img/Highly Optimized.png').default,
    description: (
      <>
        Built on openSUSE MicroOS with k3s for maximum performance and minimal
        resource usage on Hetzner Cloud.
      </>
    ),
  },
  {
    title: 'Production Ready',
    image: require('@site/static/img/Production Ready.png').default,
    description: (
      <>
        HA-default configuration with load balancing, automatic scaling,
        and enterprise-grade security features.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
          src={image}
          alt={title}
          className={styles.featureSvg}
          style={{width: '200px', height: '200px', objectFit: 'contain'}}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
