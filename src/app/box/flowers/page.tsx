import React from 'react';

import Flowers from '@/components/flowers';

import styles from './styles.module.css';

export default function Minesweeper() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.site}>
          <span className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </span>
          <a href='/'>rainbox.world</a>
        </h2>
        <h1 className={styles.title}>flowers</h1>
      </div>
      <div className={styles.flowersContainer}>
        <Flowers />
      </div>
    </div>
  );
};
