

// there are total 256³ or 16,777,216 colour combinations available in standard #RRGGBB notation

export type ColorScheme = Record<ColorID, Color>;

export type ColorID = PINKS | REDS | ORANGES | WHITES | PURPLES | BLUES | GREENS | YELLOWS | BROWNS | GRAYS;

export type Color = {
  id: ColorID;
  rgb: Array<number>;
  hsl: { hue: number; saturation: number; lightness: number; };
};

export enum PINKS {
  'E060EB' = 'E060EB',
  'EB60AB' = 'EB60AB',
  'E99A99' = 'E99A99',
  'EB60CE' = 'EB60CE',
  'EBA19B' = 'EBA19B',
} 

export enum REDS {
  'B25951' = 'B25951',
  'EB6B5E' = 'EB6B5E',
}

export enum ORANGES {
  'EB7B60' = 'EB7B60',
  'EB6260' = 'EB6260',
  'EB9360' = 'EB9360',
}

export enum PURPLES {
  'C06FAE' = 'C06FAE',
  '966F8D' = '966F8D',
  '412F3D' = '412F3D',
  '331C2E' = '331C2E',
  'BC9BEB' = 'BC9BEB',
  '54456B' = '54456B',
}

export enum BLUES {
  '5E9BEB' = '5E9BEB',
}

export enum GREENS {
  'B0E8C9' = 'B0E8C9',
  '799686_' = '799686_',
  '1F412E' = '1F412E',
  'D1EB9B' = 'D1EB9B',
  '5F6B45' = '5F6B45',
  '696B60' = '696B60',
}

export enum YELLOWS {
  'EAD244' = 'EAD244',
  'CFEB5E' = 'CFEB5E',
}

export enum GRAYS {
  '6B5F69' = '6B5F69',
  '60656B' = '60656B',
}

export enum BROWNS {
  '6B4845' = '6B4845',
  '6B6545' = '6B6545',
  '96726E' = '96726E',
}

export enum WHITES {
  'FFFFFF' = 'FFFFFF',
}

export const RGB = {
  [WHITES.FFFFFF]: [255, 255, 255],
  [REDS.B25951]: [178, 89, 81],
  [REDS.EB6B5E]: [235, 107, 94],
  [PINKS.E060EB]: [224, 96, 235],
  [PINKS.E99A99]: [233, 154, 153],
  [PINKS.EB60AB]: [235, 96, 171],
  [PINKS.EB60CE]: [235, 96, 206],
  [PINKS.EBA19B]: [235, 161, 155],
  [ORANGES.EB6260]: [235, 98, 96],
  [ORANGES.EB7B60]: [235, 123, 96],
  [ORANGES.EB9360]: [235, 147, 96],
  [PURPLES.C06FAE]: [192, 111, 174],
  [PURPLES["966F8D"]]: [150, 111, 141],
  [PURPLES["412F3D"]]: [65, 47, 61],
  [PURPLES["331C2E"]]: [51, 28, 46],
  [PURPLES.BC9BEB]: [188, 155, 235],
  [PURPLES["54456B"]]: [84, 69, 107],
  [BLUES["5E9BEB"]]: [94, 155, 235],
  [GREENS["1F412E"]]: [31, 65, 46],
  [GREENS.B0E8C9]: [176, 232, 201],
  [GREENS["799686_"]]: [121, 150, 134],
  [GREENS.D1EB9B]: [209, 235, 155],
  [GREENS["5F6B45"]]: [95, 107, 69],
  [GREENS["696B60"]]: [105, 107, 96],
  [YELLOWS.EAD244]: [234, 210, 68],
  [YELLOWS.CFEB5E]: [207, 235, 94],
  [BROWNS["6B4845"]]: [107, 72, 69],
  [BROWNS["6B6545"]]: [107, 101, 69],
  [BROWNS["96726E"]]: [150, 114, 110],
  [GRAYS["6B5F69"]]: [107, 95, 105],
  [GRAYS["60656B"]]: [96, 101, 107],
}

export const HSL = {
  [WHITES.FFFFFF]: { hue: 0, saturation: 0, lightness: 100 },
  [REDS.B25951]: { hue: 5, saturation: 39, lightness: 51 },
  [REDS.EB6B5E]: { hue: 6, saturation: 78, lightness: 78 },
  [PINKS.E060EB]: { hue: 295, saturation: 78, lightness: 65},
  [PINKS.E99A99]: { hue: 1, saturation: 65, lightness: 76},
  [PINKS.EB60AB]: { hue: 78, saturation: 65, lightness: 92},
  [PINKS.EB60CE]: { hue: 313, saturation: 78, lightness: 65 },
  [PINKS.EBA19B]: { hue: 5, saturation: 67, lightness: 76 },
  [ORANGES.EB6260]: { hue: 1, saturation: 78, lightness: 65},
  [ORANGES.EB7B60]: { hue: 12, saturation: 78, lightness: 65},
  [ORANGES.EB9360]: { hue: 22, saturation: 78, lightness: 65},
  [PURPLES.C06FAE]: { hue: 313, saturation: 39, lightness: 59 },
  [PURPLES["966F8D"]]: { hue: 314, saturation: 16, lightness: 51 },
  [PURPLES["412F3D"]]: { hue: 313, saturation: 16, lightness: 22 },
  [PURPLES["331C2E"]]: { hue: 313, saturation: 29, lightness: 15 },
  [PURPLES.BC9BEB]: { hue: 265, saturation: 57, lightness: 76 },
  [PURPLES["54456B"]]: { hue: 264, saturation: 22, lightness: 35 },
  [BLUES["5E9BEB"]]: { hue: 214, saturation: 78, lightness: 65 },
  [GREENS["1F412E"]]: { hue: 146, saturation: 35, lightness: 19 },
  [GREENS.B0E8C9]: { hue: 147, saturation: 55, lightness: 80 },
  [GREENS["799686_"]]: { hue: 147, saturation: 12, lightness: 53 },
  [GREENS.D1EB9B]: { hue: 80, saturation: 67, lightness: 76 },
  [GREENS["5F6B45"]]: { hue: 79, saturation: 22, lightness: 35 },
  [GREENS["696B60"]]: { hue: 71, saturation: 5, lightness: 40 },
  [YELLOWS.EAD244]: { hue: 51, saturation: 80, lightness: 59 },
  [YELLOWS.CFEB5E]: { hue: 72, saturation: 78, lightness: 65 },
  [BROWNS["6B4845"]]: { hue: 5, saturation: 22, lightness: 35 },
  [BROWNS["6B6545"]]: { hue: 51, saturation: 22, lightness: 35 },
  [BROWNS["96726E"]]: { hue: 6, saturation: 16, lightness: 51 },
  [GRAYS["6B5F69"]]: { hue: 310, saturation: 6, lightness: 40 },
  [GRAYS["60656B"]]: { hue: 213, saturation: 5, lightness: 40 },
}

export const PINKY_FIELD = getColorScheme([
  PINKS.E060EB, PINKS.EB60AB, PINKS.E99A99, ORANGES.EB6260, ORANGES.EB7B60, ORANGES.EB9360
]);

export const HARD_CANDY = getColorScheme([
  PINKS.EB60CE, PURPLES["331C2E"], PURPLES["412F3D"], PURPLES["966F8D"], PURPLES.C06FAE, GRAYS["6B5F69"]
]);

export const GRASSY_FIELD = getColorScheme([
  PINKS.EBA19B, REDS.B25951, GREENS.B0E8C9, GREENS["1F412E"], GREENS["799686_"], BROWNS["6B4845"]
]);

export const MEADOW_FLOWERS = getColorScheme([
  GREENS.D1EB9B, YELLOWS.EAD244, PURPLES.BC9BEB, PURPLES["54456B"], GREENS["5F6B45"], BROWNS["6B6545"]
]);

export const FUN_PRIMARIES = getColorScheme([
  BLUES["5E9BEB"], YELLOWS.CFEB5E, REDS.EB6B5E, BROWNS["96726E"], GRAYS["60656B"], GREENS["696B60"]
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

export const rgbToHex = ({r, g, b}: { r: number, g: number, b: number }) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

export const rgbToHsl = ({r, g, b}: { r: number, g: number, b: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

export const hslToRgb = ({h, s, l}: { h: number, s: number, l: number }): [number, number, number] => {  
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
