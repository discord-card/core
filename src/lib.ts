import { Canvas, CanvasRenderingContext2D as ctx2D, loadImage } from 'canvas';
import { ImageResolvable } from './types';

export function roundRect(x: number, y: number, w: number, h: number, r: number): ctx2D {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}

export function changeFont(font: string): ctx2D {
  const fontArgs = this.font.split(' ');
  let size = fontArgs[0] ?? '15px';
  this.font = `${size} ${font}, SegoeUI, SegoeUIEmoji`; /// using the first part
  return this;
}

export function changeFontSize(size: string): ctx2D {
  const fontArgs = this.font.split(' ');
  this.font = `${size} ${fontArgs.slice(1).join(' ')}`; /// using the last part
  return this;
}

export function blur(strength = 1): ctx2D {
  this.globalAlpha = 0.5; // Higher alpha made it more smooth
  // Add blur layers by strength to x and y
  // 2 made it a bit faster without noticeable quality loss
  for (var y = -strength; y <= strength; y += 2) {
    for (var x = -strength; x <= strength; x += 2) {
      // Apply layers
      this.drawImage(this.canvas, x, y);
      // Add an extra layer, prevents it from rendering lines
      // on top of the images (does makes it slower though)
      if (x >= 0 && y >= 0) {
        this.drawImage(this.canvas, -(x - 1), -(y - 1));
      }
    }
  }
  this.globalAlpha = 1.0;

  return this;
}

export function getFontSize(str: string) {
  if (str.length < 18) return 30;
  return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

export async function toImage(image: ImageResolvable, name?: string) {
  if (image instanceof Canvas) {
    let img = new Image();
    img.src = (image as Canvas).toDataURL();
    return img;
  } else if (image instanceof Image) return image;
  else if (typeof image === 'string' || image instanceof Buffer) return await loadImage(image);
  else throw new Error('Invalid Image Format for: ' + name ?? 'Image');
}
