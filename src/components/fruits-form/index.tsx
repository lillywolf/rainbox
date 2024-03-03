'use client';

import { useState } from 'react';
import { SYMBOLS, COLORS } from '@/symbols/fruits';
import useInterval from '@/utils/useInterval';

import styles from './styles.module.css';
 
export default function FruitsForm() {
  let stickySymbolWeight;
  // gravity or 'sticky' function

  const [count, setCount] = useState(0);
  const [symbols, setSymbols] = useState([]);

  const SLOTS = 1000;

  const weightedSymbols = SYMBOLS.reduce((acc, symbol) => {
    return [...acc, ...(Array(symbol.weight).fill(symbol.text))];
  }, []);

  const weightedColors = COLORS.reduce((acc, color) => {
    return [...acc, ...(Array(color.weight).fill(color.hex))];
  }, []);

  const verticalAlignments = ['text-bottom', 'text-top', 'middle'];

  const addSymbol = (newSymbol) => setSymbols((oldSymbols) => [...oldSymbols, newSymbol]);

  useInterval(() => {
    const symbol = weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
    addSymbol(symbol);
  }, symbols.length < SLOTS ? 40 : null);

  return (
    <div className={styles.form}>
      <div>
        {/* {[...Array(SLOTS)].map(() => ( */}
        {symbols.map((symbol) => (
          <span
            key={symbol}
            className={styles.symbol}
            // style={{
            //   color: `#${weightedColors[Math.floor(Math.random() * weightedColors.length)]}`,
            //   verticalAlign: verticalAlignments[Math.floor(Math.random() * verticalAlignments.length)],
            // }}
          >
            {symbol}
            {/* {weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)]} */}
          </span>
        ))}
      </div>
    </div>
  )
}