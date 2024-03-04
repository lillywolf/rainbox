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
          rainbox.world
        </h2>
        <h1 className={styles.title}>💣 minesweeper</h1>
      </div>
      <div className={styles.gameContainer}>
        <Game difficultyDefault={DIFFICULTY_CONFIG.intermediate} themeDefault={THEME_CONFIG.simple} />
      </div>
      <div className={styles.footer}>
        <p></p>
        <p>realtime processing of a chaotic existence</p>
        <p>created by <a className={styles.link} href='http://lillywolf.com'>lilly wolf 💖</a></p>
      </div>
    </div>
  );
};
