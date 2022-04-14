import { ctx2D } from '../types';

export function roundRect(ctx: ctx2D, x: number, y: number, w: number, h: number, r: number): ctx2D {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
}

export function changeFont(ctx: ctx2D, font: string): ctx2D {
  const fontArgs = ctx.font.split(' ');
  let size = fontArgs[0] ?? '15px';
  ctx.font = `${size} ${font}, SegoeUI, SegoeUIEmoji`; /// using the first part
  return ctx;
}

export function changeFontSize(ctx: ctx2D, size: string): ctx2D {
  const fontArgs = ctx.font.split(' ');
  ctx.font = `${size} ${fontArgs.slice(1).join(' ')}`; /// using the last part
  return ctx;
}

export function blur(ctx: ctx2D, strength = 1): ctx2D {
  ctx.globalAlpha = 0.5; // Higher alpha made it more smooth
  // Add blur layers by strength to x and y
  // 2 made it a bit faster without noticeable quality loss
  for (var y = -strength; y <= strength; y += 2) {
    for (var x = -strength; x <= strength; x += 2) {
      // Apply layers
      ctx.drawImage(ctx.canvas as any, x, y);
      // Add an extra layer, prevents it from rendering lines
      // on top of the images (does makes it slower though)
      if (x >= 0 && y >= 0) {
        ctx.drawImage(ctx.canvas as any, -(x - 1), -(y - 1));
      }
    }
  }
  ctx.globalAlpha = 1.0;

  return ctx;
}
