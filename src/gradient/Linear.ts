import { Gradient, GradientStop } from '.';
import { CanvasRenderingContext2D as ctx2D, CanvasGradient } from '@napi-rs/canvas';

export class LinearGradient extends Gradient {
  type: 'linear';

  constructor(...colors: GradientStop[]) {
    super('linear', ...colors);
  }

  toString(ctx: ctx2D, xPos?: number, yPos?: number, width?: number, height?: number) {
    const cW = ctx.w,
      cH = ctx.h;

    let grad: CanvasGradient;
    if (xPos && yPos) {
      if (width && height) {
        grad = ctx.createLinearGradient(xPos, yPos, xPos + width, yPos + height);
      } else {
        grad = ctx.createLinearGradient(xPos, yPos, cW - xPos, cH - yPos);
      }
    } else {
      grad = ctx.createLinearGradient(0, 0, cW, cH);
    }

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
