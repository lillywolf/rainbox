import { getWeightedSymbol } from '@/utils/minesweeper';
import { DREAMS } from './sparkles';

export const SYMBOLS = {
  relative_humidity_2m: {
    text: "🌦️",
  },
  precipitation: {
    text: "💧",
  },
  rain: {
    text: "🌧️",
  },
  cloud_cover: {
    text: "☁️"
  },
  wind_speed_10m: {
    text: "🌞"
  },
};

export const MINESWEEPER = [{
  0: {
    text: () => getWeightedSymbol(DREAMS)
  },
  1: {
    text: '☁️',
  },
  2: {
    text: '🦄',
  },
  3: {
    text: '🪞',
  },
  4: {
    text: '🧞‍♂️',
  },
  5: {
    text: '🧚‍♀️'
  },
  6: {
    text: '🫧'
  },
  7: {
    text: '💫'
  },
  8: {
    text: '🌟'
  },
  mine: {
    text: '🌞'
  }
}, {
  0: {
    text: () => getWeightedSymbol(DREAMS)
  },
  1: {
    text: '☁️',
  },
  2: {
    text: '♡',
  },
  3: {
    text: '⁂',
  },
  4: {
    text: '☏'
  },
  5: {
    text: '⬜'
  },
  6: {
    text: '⬜'
  },
  7: {
    text: '⬜'
  },
  8: {
    text: '⬜'
  },
  mine: {
    text: '☀'
  }
}];