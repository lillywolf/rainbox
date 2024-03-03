'use client';

import React, { useEffect, useRef, useState } from 'react';

import type p5Type from 'p5';
import type { P5jsContainerRef } from '@/types/p5';
import { WeatherData } from '@/types/weather';

import { WEATHER_API_URL } from '@/constants/urls';
import { sketch, CloudSketchParams } from './sketch';

import styles from './styles.module.css';

type CloudsSketchContainerProps = {
  sketch: (params: CloudSketchParams) => void
};

function CloudsSketchContainer({ sketch }: CloudsSketchContainerProps) {
  const ref = useRef<P5jsContainerRef>(null);
  const p5Instance = useRef<p5Type | null>(null); // | null creates the MutableRef object
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  async function getWeatherData() {
    try {
      const result = await fetch(WEATHER_API_URL.replace(/[\n\t\s]/g, ''));

      if (!result.ok) {
        console.error(`Couldn't fetch weather data from ${WEATHER_API_URL}`);
      }
  
      const json = await result.json();

      setWeatherData(json);
    } catch (e) {
      console.error(`Unknown error when fetching weather data: ${e}`);
    }
  }
  
  useEffect(() => {
    setIsMounted(true);
    getWeatherData();
  }, [])

  useEffect(() => {
    if (!isMounted) return;

    const initP5 = async () => {
      const p5 = (await import('p5')).default;

      new p5((p: p5Type) => {
        if (!ref.current) {
          console.error('No ref defined for p5');
          return;
        }

        if (!weatherData) {
          console.error('Missing weather data');
          return;
        }

        sketch({
          p,
          parentRef: ref.current,
          weatherData
        });

        p5Instance.current = p;
      });
    };

    initP5();

    return p5Instance?.current?.remove();
  }, [isMounted, sketch, weatherData]);

  console.log(">>> weatherData", weatherData);

  return (
    <div
      ref={ref}
      id="clouds-sketch"
      className={styles.sketch}
    >
    </div>
    );
}

export default function CloudsSketch() {
  return <CloudsSketchContainer sketch={sketch} />;
};
