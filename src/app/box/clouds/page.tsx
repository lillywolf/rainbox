'use client';

import React from 'react'; 

import styles from './clouds.module.css';
import CloudsSketch from '@/components/clouds-sketch';

export default function Clouds() {
  return (
    <div className={styles.page}>
      <h1 className={styles.header}>clouds generator</h1>
      <div className={styles.formResult}>
        <CloudsSketch />
      </div>
    </div>
  );
};