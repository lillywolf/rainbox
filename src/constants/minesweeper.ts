export enum THEME_CONFIG {
  'classic' = 'classic',
  'simple' = 'simple',
  'dark' = 'dark',
  'dreamlike' = 'dreamlike',
  'green' = 'green',
  'pink' = 'pink',
  'green_machine' = 'green_machine'
}

export enum DIFFICULTY_CONFIG {
  'easy' = 1,
  'intermediate' = 2,
  'advanced' = 3,
  'expert' = 4,
};

export type ThemeConfig = 
  THEME_CONFIG.classic
  | THEME_CONFIG.simple
  | THEME_CONFIG.dark
  | THEME_CONFIG.dreamlike
  | THEME_CONFIG.green
  | THEME_CONFIG.pink
  | THEME_CONFIG.green_machine;

export type DifficultyConfig = DIFFICULTY_CONFIG.easy | DIFFICULTY_CONFIG.intermediate | DIFFICULTY_CONFIG.advanced | DIFFICULTY_CONFIG.expert;

export const THEME_CONFIGS: Record<string, {id: ThemeConfig, icon?: string, text?: string}> = {
  [THEME_CONFIG.classic]: {
    id: THEME_CONFIG.classic,
    text: 'classic',
    icon: '📦',
  },
  [THEME_CONFIG.simple]: {
    id: THEME_CONFIG.simple,
    text: 'simple',
    icon: '💠',
  },
  [THEME_CONFIG.dark]: {
    id: THEME_CONFIG.dark,
    text: 'dark',
    icon: '🌚',
  },
  [THEME_CONFIG.dreamlike]: {
    id: THEME_CONFIG.dreamlike,
    text: 'dreamlike',
    icon: '☁️',
  },
  [THEME_CONFIG.green]: {
    id: THEME_CONFIG.green,
    text: 'green',
    icon: '🟢',
  },
  [THEME_CONFIG.pink]: {
    id: THEME_CONFIG.pink,
    text: 'pink',
    icon: '🩷',
  },
};

export const DIFFICULTY_CONFIGS: Record<string, {id: string, difficulty: DifficultyConfig, dimension: number, name: string}> = {
  [DIFFICULTY_CONFIG.easy.toString()]: {
    id: 'easy',
    difficulty: DIFFICULTY_CONFIG.easy,
    dimension: 8,
    name: 'easy'
  },
  [DIFFICULTY_CONFIG.intermediate.toString()]: {
    id: 'intermediate',
    difficulty: DIFFICULTY_CONFIG.intermediate,
    dimension: 15,
    name: 'intermediate'
  },
  [DIFFICULTY_CONFIG.advanced.toString()]: {
    id: 'advanced',
    difficulty: DIFFICULTY_CONFIG.advanced,
    dimension: 25,
    name: 'advanced'
  },
};
