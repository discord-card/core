import { Gradient, GradientStop } from '.';
import { ctx2D } from '../types';

export class RadialGradient extends Gradient {
  type: 'radial';

  constructor(...colors: GradientStop[]) {
    super('radial', ...colors);
  }

  toString(ctx: ctx2D, xPos?: number, yPos?: number, width?: number, height?: number) {
    const cW = ctx.canvas.width,
      cH = ctx.canvas.height;

    let radius: number;
    let grad: CanvasGradient;

    if (xPos && yPos) {
      if (width && height) {
        let x0 = xPos,
          y0 = yPos,
          r0: number,
          x1 = xPos + width,
          y1 = yPos + height,
          r1: number;

        if (width > height) {
          r0 = r1 = height / 2;
        } else {
          r0 = r1 = width / 2;
        }

        x0 += r0;
        y0 += r0;
        x1 -= r0;
        y1 -= r0;

        grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
      } else {
        radius = ctx.canvas.height / 2;
        grad = ctx.createRadialGradient(xPos, yPos, radius, xPos, yPos, radius);
      }
    } else {
      grad = ctx.createRadialGradient(cW / 2, cH / 2, cW / 2, cW / 2, cH / 2, cW / 2);
    }

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
