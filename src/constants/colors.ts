

// there are total 256³ or 16,777,216 colour combinations available in standard #RRGGBB notation

export type ColorScheme = Record<ColorID, Color>;

export type ColorID = PINKS | ORANGES | WHITES;

export type Color = {
  id: ColorID;
  rgb: Array<number>;
  hsl: { hue: number; saturation: number; lightness: number; };
};

export enum PINKS {
  'E060EB' = 'E060EB',
  'EB60AB' = 'EB60AB',
  'E99A99' = 'E99A99',
}

export enum ORANGES {
  'EB7B60' = 'EB7B60',
  'EB6260' = 'EB6260',
  'EB9360' = 'EB9360',
}

export enum WHITES {
  'FFFFFF' = 'FFFFFF',
}

export const RGB = {
  [WHITES.FFFFFF]: [255, 255, 255],
  [PINKS.E060EB]: [224, 96, 235],
  [PINKS.E99A99]: [233, 154, 153],
  [PINKS.EB60AB]: [235, 96, 171],
  [ORANGES.EB6260]: [235, 98, 96],
  [ORANGES.EB7B60]: [235, 123, 96],
  [ORANGES.EB9360]: [235, 147, 96],
}

export const HSL = {
  [WHITES.FFFFFF]: { hue: 0, saturation: 0, lightness: 100 },
  [PINKS.E060EB]: { hue: 295, saturation: 78, lightness: 65},
  [PINKS.E99A99]: { hue: 1, saturation: 65, lightness: 76},
  [PINKS.EB60AB]: { hue: 78, saturation: 65, lightness: 92},
  [ORANGES.EB6260]: { hue: 1, saturation: 78, lightness: 65},
  [ORANGES.EB7B60]: { hue: 12, saturation: 78, lightness: 65},
  [ORANGES.EB9360]: { hue: 22, saturation: 78, lightness: 65},
}

export const PINKY_FIELD = getColorScheme([
  PINKS.E060EB, PINKS.EB60AB, PINKS.E99A99, ORANGES.EB6260, ORANGES.EB7B60, ORANGES.EB9360
]);

export const WHITE = getColorScheme([WHITES.FFFFFF]).FFFFFF;

export function getColorScheme(ids: ColorID[]): ColorScheme {
  return ids.reduce((acc, id) => ({
    ...acc,
    [id]: {
      id,
      rgb: RGB[id],
      hsl: HSL[id],
    }
  }), {} as Record<ColorID, Color>);
}
