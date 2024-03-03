export type WEATHER_KEYS =
  'apparent_temperature'
  | 'cloud_cover'
  | 'dew_point_2m'
  | 'relative_humidity_2m'
  | 'precipitation'
  | 'precipitation_probability'
  | 'rain'
  | 'showers'
  | 'snowfall'
  | 'snow_depth'
  | 'temperature_2m'
  | 'visibility'
  | 'wind_gusts_10m'
  | 'wind_speed_10m';

export type WeatherData = {
  latitude: string;
  longitude: string;
  elevation: number;
  daily: {
    sunrise: [string];
    sunset: [string];
  },
  hourly: Record<WEATHER_KEYS, [number]> & { time: string };
  current: {
    apparent_temperature: number;
    cloud_cover: number;
    is_day: boolean;
    precipitation: number;
    rain: number;
    relative_humidity_2m: number;
    showers: number;
    snowfall: number;
    temperature_2m: number;
    time: string;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  },
  current_units: {
    apparent_temperature: string;
    cloud_cover: string;
    precipitation: string;
    rain: string;
    relative_humidity_2m: string;
    showers: string;
    snowfall: string;
    temperature_2m: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  },
  timezone: string;
}
