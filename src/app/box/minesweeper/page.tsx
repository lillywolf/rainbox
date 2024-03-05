import React from 'react'; 

import Game from '@/components/minesweeper/game';
import { DIFFICULTY_CONFIG, THEME_CONFIG } from '@/constants/minesweeper';

import styles from './styles.module.css';

export default function Minesweeper() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.site}>
          <span className={styles.sparkles}>   ˚　　　　✦　　　.　　. 　 ˚ ✰✰　.　　　　 </span>
          <a href='/'>rainbox.world</a>
        </h2>
        <h1 className={styles.title}>💣 minesweeper</h1>
      </div>
      <div className={styles.gameContainer}>
        <Game difficultyDefault={DIFFICULTY_CONFIG.intermediate} themeDefault={THEME_CONFIG.simple} />
      </div>
    </div>
  );
};
