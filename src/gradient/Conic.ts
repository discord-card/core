import { Gradient, GradientStop } from '.';
import { CanvasRenderingContext2D as ctx2D, CanvasGradient } from '@napi-rs/canvas';

export class ConicGradient extends Gradient {
  type: 'conic';

  constructor(...colors: GradientStop[]) {
    super('conic', ...colors);
  }

  toString(ctx: ctx2D, xPos?: number, yPos?: number, width?: number, height?: number) {
    let grad: CanvasGradient;
    if (xPos && yPos) {
      //@ts-ignore
      grad = ctx.createConicGradient(startAngle, xPos, yPos);
    } else {
      //@ts-ignore
      grad = ctx.createConicGradient(0, 0, 0);
    }

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
