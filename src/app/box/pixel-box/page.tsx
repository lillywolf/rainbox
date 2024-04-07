import React from 'react';

import PixelBoxCanvas from '@/components/pixel-box';

import styles from './styles.module.css';

export default function PixelBox() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.site}>
          <span className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </span>
          <a href='/'>rainbox.world</a>
        </h2>
        <h1 className={styles.title}>pixel box</h1>
      </div>
      <div className={styles.pixelBoxContainer}>
        <PixelBoxCanvas />
      </div>
    </div>
  );
};
