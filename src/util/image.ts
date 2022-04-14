import axios from 'axios';
import { ImageResolvable, Image, Canvas } from '../types';

export function getFontSize(str: string) {
  if (str.length < 18) return 30;
  return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

/** Load a image from a URL */
export async function loadImage(url: string): Promise<Image> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(response.data, 'binary');

  let img = new Image();
  img.src = buffer;
  return img;
}

export async function toImage(image: ImageResolvable, name?: string): Promise<Image> {
  if (image instanceof Canvas) {
    let img = new Image();
    img.src = (image as Canvas).toBuffer('image/png');
    return img;
  } else if (image instanceof Image) return image;
  else if (image instanceof Buffer) {
    let img = new Image();
    img.src = image;
    return img;
  } else if (typeof image === 'string') return await loadImage(image);
  else throw new Error('Invalid Image Format for: ' + name ?? 'Image');
}
