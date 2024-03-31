import React from 'react';

import DreamFilesCanvas from '@/components/dream-files';

import styles from './styles.module.css';

export default function DreamFiles() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.site}>
          <span className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </span>
          <a href='/'>rainbox.world</a>
        </h2>
        <h1 className={styles.title}>dream files</h1>
      </div>
      <div className={styles.dreamFilesContainer}>
        <DreamFilesCanvas />
      </div>
    </div>
  );
};