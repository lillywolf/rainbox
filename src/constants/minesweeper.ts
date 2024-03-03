export enum THEME_CONFIG {
  'classic' = 'classic',
  'simple' = 'simple',
  'dark' = 'dark',
  'dreamlike' = 'dreamlike',
  'green' = 'green',
  'pink' = 'pink'
}

export enum DIFFICULTY_CONFIG {
  'easy' = 1,
  'intermediate' = 2,
  'advanced' = 3,
  'expert' = 4
};

export type ThemeConfig = THEME_CONFIG.classic | THEME_CONFIG.simple | THEME_CONFIG.dark | THEME_CONFIG.dreamlike | THEME_CONFIG.green | THEME_CONFIG.pink;

export type DifficultyConfig = DIFFICULTY_CONFIG.easy | DIFFICULTY_CONFIG.intermediate | DIFFICULTY_CONFIG.advanced | DIFFICULTY_CONFIG.expert;

export const THEME_CONFIGS: Record<string, ThemeConfig> = {
  [THEME_CONFIG.classic]: THEME_CONFIG.classic,
  [THEME_CONFIG.simple]: THEME_CONFIG.simple,
  [THEME_CONFIG.dark]: THEME_CONFIG.dark,
  [THEME_CONFIG.dreamlike]: THEME_CONFIG.dreamlike,
  [THEME_CONFIG.green]: THEME_CONFIG.green,
  [THEME_CONFIG.pink]: THEME_CONFIG.pink,
};

export const DIFFICULTY_CONFIGS: Record<string, {difficulty: DifficultyConfig, dimension: number, name: string}> = {
  [DIFFICULTY_CONFIG.easy.toString()]: {
    difficulty: DIFFICULTY_CONFIG.easy,
    dimension: 5,
    name: 'easy'
  },
  [DIFFICULTY_CONFIG.intermediate.toString()]: {
    difficulty: DIFFICULTY_CONFIG.intermediate,
    dimension: 15,
    name: 'intermediate'
  },
  [DIFFICULTY_CONFIG.advanced.toString()]: {
    difficulty: DIFFICULTY_CONFIG.advanced,
    dimension: 25,
    name: 'advanced'
  }
};
