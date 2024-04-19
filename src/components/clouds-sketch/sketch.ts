import type p5Type from 'p5';

// @ts-ignore
// import ml5 from 'ml5';

import { SYMBOLS } from '@/symbols/clouds';
import { P5jsContainerRef } from '@/types/p5';
import { WEATHER_KEYS, WeatherData } from '@/types/weather';

const TEXT_SIZE_BASIS = 24;
const LEFT_COLUMN_WIDTH = 40;

export type CloudSketchParams = {
  p: p5Type;
  parentRef: P5jsContainerRef;
  weatherData: WeatherData
};

export const sketch = ({ p, parentRef, weatherData}: CloudSketchParams) => {
  p.setup = () => {
    const parentStyle = window.getComputedStyle(parentRef);
    const canvasWidth = parseInt(parentStyle.width) * 0.98;
    const canvasHeight = parseInt(parentStyle.height) * 0.98;
    p.createCanvas(canvasWidth, canvasHeight).parent(parentRef.id);
    // const facemesh = ml5.facemesh();
  };

  p.draw = () => {
    p.background(250);
    p.textSize(20);

    const sunrise = Date.parse(weatherData.daily.sunrise[0]);
    const sunset = Date.parse(weatherData.daily.sunset[0]);
    // console.log(">>> sunrise", sunrise);
    // console.log(">>> sunset", sunset);

    [...Array(24)].forEach((_, i) => {
      const d = Date.parse(weatherData.hourly.time[i]);
      // console.log(">>> d", d);

      (d > sunrise && d < sunset)
        ? p.text(`🌞`, 10, TEXT_SIZE_BASIS * (i+1))
        : p.text(`🌚`, 10, TEXT_SIZE_BASIS * (i+1));
    });

    Object.keys(weatherData.hourly).forEach((key) => {
      weatherData.hourly[key as WEATHER_KEYS].forEach((value, j) => {
        if (key === "cloud_cover") {
          [...Array(Math.ceil(value/10))].forEach((cloud, k) => {
            p.text(SYMBOLS[key].text, LEFT_COLUMN_WIDTH + TEXT_SIZE_BASIS * k, TEXT_SIZE_BASIS * j);
          });
        }
      });
    });
  };
};
