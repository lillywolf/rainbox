import { Point3D } from "@/types/geometry";

export const position = (pt: Point3D, dimensions: Point3D) => {
  return {
    x: toFloat({ value: pt.x, range: dimensions.x }),
    y: toFloat({ value: pt.y, range: dimensions.y }),
    z: toFloat({ value: pt.z, range: dimensions.z }),
  };
};

export const toRGB = (rgb: [number, number, number]) => {
  return [
    toFloat({ value: rgb[0], range: 255 }),
    toFloat({ value: rgb[1], range: 255 }),
    toFloat({ value: rgb[2], range: 255 }),
  ];
};

const toFloat = ({ value, range }: { value: number, range: number }) => {
  return parseFloat((value / range).toFixed(2));
};
