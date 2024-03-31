import React from 'react';

import IsometricCanvas from '@/components/isometric';

import styles from './styles.module.css';

export default function Isometric() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.site}>
          <span className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </span>
          <a href='/'>rainbox.world</a>
        </h2>
        <h1 className={styles.title}>isometric</h1>
      </div>
      <div className={styles.isometricContainer}>
        <IsometricCanvas />
      </div>
    </div>
  );
};
