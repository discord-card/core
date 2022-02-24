import { CanvasRenderingContext2D as ctx2D } from 'canvas';
import { join } from 'path';
import { Gradient } from './gradient';

declare global {
  interface CanvasRenderingContext2D {
    width: number;
    w: number;
    height: number;
    h: number;
    theme: Theme;

    roundRect(x: number, y: number, w: number, h: number, r: number): this;
    changeFont(font: string): this;
    changeFontSize(size: string): this;
    blur(strength: number): this;
  }
}

ctx2D.prototype.roundRect = function (x, y, w, h, r) {
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
};

ctx2D.prototype.changeFont = function (font) {
  var fontArgs = this.font.split(' ');
  this.font = fontArgs[0] + ' ' + font; /// using the first part
  return this;
};

ctx2D.prototype.changeFontSize = function (size) {
  var fontArgs = this.font.split(' ');
  this.font = size + ' ' + fontArgs.slice(1).join(' '); /// using the last part
  return this;
};

ctx2D.prototype.blur = function (strength = 1) {
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
};

export type Theme = {
  color: string | Gradient;
  image: string | Buffer;
  font?: string;
};

import './fonts';
export * from './gradient';
