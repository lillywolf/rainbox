import { Point } from "@/types/geometry";
import { FileLabel } from "src/classes/DreamFile";

export enum COLORS {
  white = 'white',
  'transparent' = 'transparent',
  'light-pink' = 'light-pink',
  'dark-gray' = 'dark-gray',
  'medium-gray' = 'medium-gray',
  'light-gray' = 'light-gray',
  'lighter-gray' = 'lighter-gray',
  'cloud-gray' = 'cloud-gray',
  'almost-black' = 'almost-black',
  black = 'black',
};

export const COLOR_CODES: Record<COLORS, Array<number>> = {
  white: [255, 255, 255, 255],
  'transparent': [255, 255, 255, 0],
  'light-pink': [204, 150, 193],
  'dark-gray': [51, 51, 51],
  'medium-gray': [80, 80, 80],
  'light-gray': [119, 119, 119],
  'lighter-gray': [163, 163, 163],
  'cloud-gray': [206, 206, 206],
  'almost-black': [17, 17, 17],
  black: [0, 0, 0],
};

export const FILE_PIXELS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}, {x: 10, y: 0}, {x: 11, y: 0}, {x: 12, y: 0}, {x: 13, y: 0}, {x: 14, y: 0}, {x: 15, y: 0}, {x: 16, y: 0}, {x: 17, y: 0},
    {x: 0, y: 1}, {x: 17, y: 1}, {x: 18, y: 1},
    {x: 0, y: 2}, {x: 17, y: 2}, {x: 19, y: 2},
    {x: 0, y: 3}, {x: 17, y: 3}, {x: 20, y: 3},
    {x: 0, y: 4}, {x: 17, y: 4}, {x: 18, y: 4}, {x: 19, y: 4}, {x: 20, y: 4}, {x: 21, y: 4},
    {x: 0, y: 5}, {x: 21, y: 5},
    {x: 0, y: 6}, {x: 21, y: 6},
    {x: 0, y: 7}, {x: 21, y: 7},
    {x: 0, y: 8}, {x: 21, y: 8},
    {x: 0, y: 9}, {x: 21, y: 9},
    {x: 0, y: 10}, {x: 21, y: 10},
    {x: 0, y: 11}, {x: 21, y: 11},
    {x: 0, y: 12}, {x: 21, y: 12},
    {x: 0, y: 13}, {x: 21, y: 13},
    {x: 0, y: 14}, {x: 21, y: 14},
    {x: 0, y: 15}, {x: 21, y: 15},
    {x: 0, y: 16}, {x: 21, y: 16},
    {x: 0, y: 17}, {x: 21, y: 17},
    {x: 0, y: 18}, {x: 21, y: 18},
    {x: 0, y: 19}, {x: 21, y: 19},
    {x: 0, y: 20}, {x: 21, y: 20},
    {x: 0, y: 21}, {x: 21, y: 21},
    {x: 0, y: 22}, {x: 21, y: 22},
    {x: 0, y: 23}, {x: 21, y: 23},
    {x: 0, y: 24}, {x: 21, y: 24},
    {x: 0, y: 25}, {x: 21, y: 25},
    {x: 0, y: 26}, {x: 21, y: 26},
    {x: 1, y: 27}, {x: 2, y: 27}, {x: 3, y: 27}, {x: 4, y: 27}, {x: 5, y: 27}, {x: 6, y: 27}, {x: 7, y: 27}, {x: 8, y: 27}, {x: 9, y: 27}, {x: 10, y: 27}, {x: 11, y: 27}, {x: 12, y: 27}, {x: 13, y: 27}, {x: 14, y: 27}, {x: 15, y: 27}, {x: 16, y: 27}, {x: 17, y: 27}, {x: 18, y: 27}, {x: 19, y: 27}, {x: 20, y: 27},
  ],
  [COLORS["light-gray"]]: [
    {x: 16, y: 1},
    {x: 16, y: 2},
    {x: 16, y: 3},
    {x: 16, y: 4},
    {x: 16, y: 5}, {x: 17, y: 5}, {x: 18, y: 5}, {x: 19, y: 5}, {x: 20, y: 5}, 
    {x: 20, y: 6},
    {x: 20, y: 7},
    {x: 20, y: 8},
    {x: 20, y: 9},
    {x: 20, y: 6},
    {x: 20, y: 7},
    {x: 20, y: 8},
    {x: 20, y: 9},
    {x: 20, y: 10},
    {x: 20, y: 11},
    {x: 20, y: 12},
    {x: 20, y: 13},
    {x: 20, y: 14},
    {x: 20, y: 15},
    {x: 20, y: 16},
    {x: 20, y: 17},
    {x: 20, y: 18},
    {x: 20, y: 19},
    {x: 20, y: 20},
    {x: 20, y: 21},
    {x: 20, y: 22},
    {x: 20, y: 23},
    {x: 20, y: 24},
    {x: 20, y: 25},
    {x: 1, y: 26}, {x: 2, y: 26}, {x: 3, y: 26}, {x: 4, y: 26}, {x: 5, y: 26}, {x: 6, y: 26}, {x: 7, y: 26}, {x: 8, y: 26}, {x: 9, y: 26}, {x: 10, y: 26}, {x: 11, y: 26}, {x: 12, y: 26}, {x: 13, y: 26}, {x: 14, y: 26}, {x: 15, y: 26}, {x: 16, y: 26}, {x: 17, y: 26}, {x: 18, y: 26}, {x: 19, y: 26}, {x: 20, y: 26},
  ],
  [COLORS["lighter-gray"]]: [
    {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, {x: 10, y: 5}, {x: 11, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, 
    {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}, {x: 6, y: 9}, {x: 7, y: 9}, {x: 8, y: 9}, {x: 9, y: 9}, {x: 10, y: 9}, {x: 11, y: 9}, {x: 12, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 15, y: 9}, 
    {x: 3, y: 13}, {x: 4, y: 13}, {x: 5, y: 13}, {x: 6, y: 13}, {x: 7, y: 13}, {x: 8, y: 13}, {x: 9, y: 13}, {x: 10, y: 13}, {x: 11, y: 13}, {x: 12, y: 13}, {x: 13, y: 13}, {x: 14, y: 13}, {x: 15, y: 13}, 
    {x: 3, y: 17}, {x: 4, y: 17}, {x: 5, y: 17}, {x: 6, y: 17}, {x: 7, y: 17}, {x: 8, y: 17}, {x: 9, y: 17}, {x: 10, y: 17}, {x: 11, y: 17}, {x: 12, y: 17}, {x: 13, y: 17}, {x: 14, y: 17}, {x: 15, y: 17}, 
    {x: 3, y: 21}, {x: 4, y: 21}, {x: 5, y: 21}, {x: 6, y: 21}, {x: 7, y: 21}, {x: 8, y: 21}, {x: 9, y: 21}, {x: 10, y: 21}, {x: 11, y: 21}, {x: 12, y: 21}, {x: 13, y: 21}, {x: 14, y: 21}, {x: 15, y: 21}, 
    // {x: 3, y: 22}, {x: 4, y: 22}, {x: 5, y: 22}, {x: 6, y: 22}, {x: 7, y: 22}, {x: 8, y: 22}, {x: 9, y: 22}, {x: 10, y: 22}, {x: 11, y: 22}, {x: 12, y: 22}, {x: 13, y: 22}, {x: 14, y: 22}, {x: 15, y: 22}, 
  ]
};

export const FOLDER_PIXELS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}, {x: 10, y: 0},
    {x: 1, y: 1}, {x: 11, y: 1},
    {x: 0, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}, {x: 17, y: 2}, {x: 18, y: 2}, {x: 19, y: 2}, {x: 20, y: 2}, {x: 21, y: 2}, {x: 22, y: 2}, {x: 23, y: 2}, {x: 24, y: 2}, {x: 25, y: 2}, {x: 26, y: 2},
    {x: 0, y: 3}, {x: 27, y: 3},
    {x: 0, y: 4}, {x: 28, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, {x: 10, y: 5}, {x: 11, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, {x: 16, y: 5}, {x: 17, y: 5}, {x: 18, y: 5}, {x: 19, y: 5}, {x: 20, y: 5}, {x: 21, y: 5}, {x: 22, y: 5}, {x: 23, y: 5}, {x: 24, y: 5}, {x: 25, y: 5}, {x: 28, y: 5},
    {x: 0, y: 6}, {x: 2, y: 6}, {x: 26, y: 6}, {x: 28, y: 6},
    {x: 0, y: 7}, {x: 1, y: 7}, {x: 27, y: 7}, {x: 28, y: 7},
    {x: 0, y: 8}, {x: 28, y: 8},
    {x: 0, y: 9}, {x: 28, y: 9},
    {x: 0, y: 10}, {x: 28, y: 10},
    {x: 0, y: 11}, {x: 28, y: 11},
    {x: 0, y: 12}, {x: 28, y: 12},
    {x: 0, y: 13}, {x: 28, y: 13},
    {x: 0, y: 14}, {x: 28, y: 14},
    {x: 0, y: 15}, {x: 28, y: 15},
    {x: 0, y: 16}, {x: 28, y: 16},
    {x: 0, y: 17}, {x: 28, y: 17},
    {x: 0, y: 18}, {x: 28, y: 18},
    {x: 0, y: 19}, {x: 28, y: 19},
    {x: 0, y: 20}, {x: 28, y: 20},
    {x: 0, y: 21}, {x: 28, y: 21},
    {x: 0, y: 22}, {x: 28, y: 22},
    {x: 1, y: 23}, {x: 27, y: 23},
    {x: 2, y: 24}, {x: 3, y: 24}, {x: 4, y: 24}, {x: 5, y: 24}, {x: 6, y: 24}, {x: 7, y: 24}, {x: 8, y: 24}, {x: 9, y: 24}, {x: 10, y: 24}, {x: 11, y: 24}, {x: 12, y: 24}, {x: 13, y: 24}, {x: 14, y: 24}, {x: 15, y: 24}, {x: 16, y: 24}, {x: 17, y: 24}, {x: 18, y: 24}, {x: 19, y: 24}, {x: 20, y: 24}, {x: 21, y: 24}, {x: 22, y: 24}, {x: 23, y: 24}, {x: 24, y: 24}, {x: 25, y: 24}, {x: 26, y: 24},
  ],
  [COLORS['dark-gray']]: [
    {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}, {x: 9, y: 1}, {x: 10, y: 1},
    {x: 1, y: 2}, {x: 11, y: 2},
    {x: 1, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 15, y: 3}, {x: 16, y: 3}, {x: 17, y: 3}, {x: 18, y: 3}, {x: 19, y: 3}, {x: 20, y: 3}, {x: 21, y: 3}, {x: 22, y: 3}, {x: 23, y: 3}, {x: 24, y: 3}, {x: 25, y: 3}, {x: 26, y: 3},
    {x: 1, y: 4}, {x: 27, y: 4},
    {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6}, {x: 13, y: 6}, {x: 14, y: 6}, {x: 15, y: 6}, {x: 16, y: 6}, {x: 17, y: 6}, {x: 18, y: 6}, {x: 19, y: 6}, {x: 20, y: 6}, {x: 21, y: 6}, {x: 22, y: 6}, {x: 23, y: 6}, {x: 24, y: 6}, {x: 25, y: 6},
  ],
  [COLORS['light-gray']]: [
    {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}, {x: 10, y: 4}, {x: 11, y: 4}, {x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 15, y: 4}, {x: 16, y: 4}, {x: 17, y: 4}, {x: 18, y: 4}, {x: 19, y: 4}, {x: 20, y: 4}, {x: 21, y: 4}, {x: 22, y: 4}, {x: 23, y: 4}, {x: 24, y: 4}, {x: 25, y: 4}, {x: 26, y: 4},
    {x: 1, y: 5}, {x: 2, y: 5}, {x: 26, y: 5}, {x: 27, y: 5},
    {x: 1, y: 6}, {x: 27, y: 6},
  ],
  [COLORS.black]: [
    {x: 27, y: 8},
    {x: 27, y: 9},
    {x: 27, y: 10},
    {x: 27, y: 11},
    {x: 27, y: 12},
    {x: 27, y: 13},
    {x: 27, y: 14},
    {x: 27, y: 15},
    {x: 27, y: 16},
    {x: 27, y: 17},
    {x: 27, y: 18},
    {x: 27, y: 19},
    {x: 27, y: 20},
    {x: 27, y: 21},
    {x: 26, y: 22}, {x: 27, y: 22},
    {x: 2, y: 23}, {x: 3, y: 23}, {x: 4, y: 23}, {x: 5, y: 23}, {x: 6, y: 23}, {x: 7, y: 23}, {x: 8, y: 23}, {x: 9, y: 23}, {x: 10, y: 23}, {x: 11, y: 23}, {x: 12, y: 23}, {x: 13, y: 23}, {x: 14, y: 23}, {x: 15, y: 23}, {x: 16, y: 23}, {x: 17, y: 23}, {x: 18, y: 23}, {x: 19, y: 23}, {x: 20, y: 23}, {x: 21, y: 23}, {x: 22, y: 23}, {x: 23, y: 23}, {x: 24, y: 23}, {x: 25, y: 23}, {x: 26, y: 23},
  ],
};

export const OPEN_FOLDER_PIXELS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 18, y: 0}, {x: 19, y: 0}, {x: 20, y: 0}, {x: 21, y: 0}, {x: 22, y: 0}, {x: 23, y: 0}, {x: 24, y: 0}, {x: 25, y: 0}, {x: 26, y: 0}, 
    {x: 17, y: 1}, {x: 27, y: 1},
    {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 9, y: 2}, {x: 10, y: 2}, {x: 9, y: 2}, {x: 10, y: 2}, {x: 11, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}, {x: 28, y: 2},
    {x: 1, y: 3}, {x: 28, y: 3},
    {x: 0, y: 4}, {x: 28, y: 4},
    {x: 0, y: 5}, {x: 28, y: 5},
    {x: 0, y: 6}, {x: 28, y: 6},
    {x: 0, y: 7}, {x: 28, y: 7},
    {x: 0, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 8}, {x: 8, y: 8}, {x: 9, y: 8}, {x: 10, y: 8}, {x: 11, y: 8}, {x: 12, y: 8}, {x: 13, y: 8}, {x: 14, y: 8}, {x: 15, y: 8}, {x: 16, y: 8}, {x: 17, y: 8}, {x: 18, y: 8}, {x: 19, y: 8}, {x: 20, y: 8}, {x: 21, y: 8}, {x: 22, y: 8}, {x: 23, y: 8}, {x: 24, y: 8}, {x: 25, y: 8}, {x: 26, y: 8}, {x: 27, y: 8}, {x: 28, y: 8},
    {x: 0, y: 9}, {x: 4, y: 9}, {x: 29, y: 9},
    {x: 0, y: 10}, {x: 4, y: 10}, {x: 29, y: 10},
    {x: 0, y: 11}, {x: 4, y: 11}, {x: 29, y: 11},
    {x: 0, y: 12}, {x: 4, y: 12}, {x: 29, y: 12},
    {x: 0, y: 13}, {x: 3, y: 13}, {x: 28, y: 13},
    {x: 0, y: 14}, {x: 3, y: 14}, {x: 28, y: 14},
    {x: 0, y: 15}, {x: 3, y: 15}, {x: 28, y: 15},
    {x: 0, y: 16}, {x: 2, y: 16}, {x: 27, y: 16},
    {x: 0, y: 17}, {x: 2, y: 17}, {x: 27, y: 17},
    {x: 0, y: 18}, {x: 2, y: 18}, {x: 27, y: 18},
    {x: 0, y: 19}, {x: 2, y: 19}, {x: 27, y: 19},
    {x: 0, y: 20}, {x: 1, y: 20}, {x: 26, y: 20},
    {x: 0, y: 21}, {x: 1, y: 21}, {x: 26, y: 21},
    {x: 0, y: 22}, {x: 1, y: 22}, {x: 26, y: 22},
    {x: 1, y: 23}, {x: 2, y: 23}, {x: 3, y: 23}, {x: 4, y: 23}, {x: 5, y: 23}, {x: 6, y: 23}, {x: 7, y: 23}, {x: 8, y: 23}, {x: 9, y: 23}, {x: 10, y: 23}, {x: 11, y: 23}, {x: 12, y: 23}, {x: 13, y: 23}, {x: 14, y: 23}, {x: 15, y: 23}, {x: 16, y: 23}, {x: 17, y: 23}, {x: 18, y: 23}, {x: 19, y: 23}, {x: 20, y: 23}, {x: 21, y: 23}, {x: 22, y: 23}, {x: 23, y: 23}, {x: 24, y: 23}, {x: 25, y: 23}, {x: 26, y: 23},
  ],
  [COLORS['almost-black']]: [
    {x: 18, y: 1}, {x: 19, y: 1}, {x: 20, y: 1}, {x: 21, y: 1}, {x: 22, y: 1}, {x: 23, y: 1}, {x: 24, y: 1}, {x: 25, y: 1}, {x: 26, y: 1}, 
    {x: 17, y: 2}, {x: 27, y: 2},
    {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 27, y: 3},
    {x: 1, y: 4}, {x: 27, y: 4},
    {x: 1, y: 5}, {x: 27, y: 5},
    {x: 1, y: 6}, {x: 27, y: 6},
    {x: 1, y: 7},
    {x: 1, y: 8},
    {x: 1, y: 9},
    {x: 1, y: 10}, {x: 28, y: 10},
    {x: 1, y: 11}, {x: 28, y: 11},
    {x: 1, y: 12}, {x: 28, y: 12},
    {x: 1, y: 13}, {x: 27, y: 13},
    {x: 1, y: 14}, {x: 27, y: 14},
    {x: 1, y: 15}, {x: 27, y: 15},
    {x: 1, y: 16}, {x: 26, y: 16},
    {x: 1, y: 17}, {x: 26, y: 17},
    {x: 1, y: 18}, {x: 26, y: 18},
    {x: 1, y: 19}, {x: 26, y: 19},
    {x: 25, y: 20},
  ]
};

export const PLUS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0},
    {x: 0, y: 1}, {x: 10, y: 1},
    {x: 0, y: 2}, {x: 10, y: 2},
    {x: 0, y: 3}, {x: 5, y: 3}, {x: 10, y: 3},
    {x: 0, y: 4}, {x: 5, y: 4}, {x: 10, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 10, y: 5},
    {x: 0, y: 6}, {x: 5, y: 6}, {x: 10, y: 6},
    {x: 0, y: 7}, {x: 5, y: 7}, {x: 10, y: 7},
    {x: 0, y: 8}, {x: 10, y: 8},
    {x: 0, y: 9}, {x: 10, y: 9},
    {x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10},
  ]
}

export const MINUS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0},
    {x: 0, y: 1}, {x: 10, y: 1},
    {x: 0, y: 2}, {x: 10, y: 2},
    {x: 0, y: 3}, {x: 10, y: 3},
    {x: 0, y: 4}, {x: 10, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 10, y: 5},
    {x: 0, y: 6}, {x: 10, y: 6},
    {x: 0, y: 7}, {x: 10, y: 7},
    {x: 0, y: 8}, {x: 10, y: 8},
    {x: 0, y: 9}, {x: 10, y: 9},
    {x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10},
  ]
}

export const FILE_LABELS: Array<FileLabel> = [
  { text: `... does anybody hear me ?` },
  { text: `cars lost in deserts` },
  { text: `xxxxxxxxx hi xxxxxxxxx` },
  { text: `the bloomberg terminal` },
  { text: `location of house keys` },
  { text: `bicycles on the garage roof` },
  { text: `the mitochondria is the powerhouse of the cell` },
  { text: `yellow soccer jersey` },
  { text: `fred again` },
  { text: `totallynotporn.zip` },
];

export const FOLDER_LABELS: Array<FileLabel> = [
  { text: `............................ until the pain wears off` },
  { text: `..`, levelMinimum: 1 },
  { text: `............... hi, hello, hi` },
  { text: `gn gn gn gn` },
  { text: `??` },
  { text: `things` },
  { text: `rx` },
  { text: `tmp` },
  { text: `local` },
  { text: `funny` },
  { text: `rules engine` },
  { text: `wtf` },
  { text: `los altos` },
  { text: `518-383-1290` },
  { text: '❒ ❒ ❒ ❒ ❒ ❒' },
  { text: `ibuprofen` },
  { text: `0, 1 ... 4776, 4777` },
  { text: `old restaurant receipts` },
  { text: '˚　　　　✦　　　.　　. 　 ˚　.　　　　　 . ✦　　　 　˚　　　　 . ★⋆. ࿐࿔　　　.   　　˚　　　.　　.　　　✦　˚' },
  { text: '୭  🧷 ✧ ˚.  ᵎᵎ  🎀⋆｡‧˚ʚ🍓ɞ˚‧💋ྀིྀི' },
  { text: `people i definitely don't think about` },
  { text: `[empty]` },
  { text: `calculus` },
  { text: `the green towel` },
  { text: `screenshots` },
  { text: `writing` },
  { text: `roberto bolaño` },
  { text: `creepy jeremy` },
  { text: `sore wa itai` },
  { text: '______________ 🧠' },
  { text: `615 grooms rd` },
  { text: `happy donuts` },
  { text: `1x` },
  { text: `test` },
  { text: `silo` },
  { text: `x` },
  { text: `'''''''''''' ok` },
  { text: `blah` },
  { text: `f` },
  { text: `mom` },
  { text: `romcoms` },
  { text: `fuzzy kitten` },
  { text: `words to use when in sudden unexpected pain` },
  { text: `update.901128452` },
  { text: `lol` },
  { text: `can't think about this rn` },
  { text: `theme songs from television shows` },
  { text: `text messages from boys` },
  { text: `other people` },
  { text: `therapy sessions` },
  { text: `parties` },
  { text: `abandoned` },
  { text: `recordings of people` },
  { text: `images` },
  { text: `taxes_4.14.2022` },
  { text: `public` },
  { text: `misc` },
  { text: `does it spark joy` },
  { text: `i wanna go home` },
  { text: `top secret` },
  { text: `idk` },
  { text: `ådÄ` },
  { text: `one_day_this_can_be_deleted` },
  { text: `💀` },
  { text: `banana BANANA BANANA` },
  { text: `ketamine` },
  { text: `17` },
  { text: `bullshit` },
  { text: `names of presidents` },
  { text: `bin` },
  { text: `[artist name goes here]` },
  { text: `UGH` },  
  { text: `numbing agents` },
  { text: `~/` },
  { text: `error_messages` },
  { text: `bs` },
  { text: `stuff to remember!! remember it!!!!!!!` },
  { text: '🍋' },
  { text: `mckibbin lofts` },
  { text: `.`, levelMaximum: 0 },
  { text: `all mail incl_-005` },
  { text: `conversations_3.09.9.46` },
  { text: `nov 13 2023` },
  { text: `fe80::` },
  { text: `stuff` },
  { text: '------------------> dance dance dance (ง ˃ ³ ˂)ว ⁼³₌₃⁼³' },
  { text: `cheesy quotes` },
  { text: `stock responses to people` },
  { text: `................................................... ?` },
];
