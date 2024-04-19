import { Point3D } from "@/types/geometry";
import { mat4 } from "gl-matrix";

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
  return parseFloat((value / range).toFixed(12));
};

export const projection = ({width, height, depth}: {width: number, height: number, depth: number}) => {
  // this matrix flips the y axis so 0 is at the top
  return mat4.fromValues(
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
  );
};

export const createPerspectiveMatrix = ({
  fieldOfViewInRadians,
  aspectRatio,
  near,
  far,
}: {
  fieldOfViewInRadians: number;
  aspectRatio: number;
  near: number;
  far: number;
}) => {
  const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
  const rangeInv = 1 / (near - far);

  return mat4.fromValues(
    f / aspectRatio,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (near + far) * rangeInv,
    -1,
    0,
    0,
    near * far * rangeInv * 2,
    0,
  );
};
