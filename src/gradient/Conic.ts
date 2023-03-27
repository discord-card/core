import { Gradient, GradientStop } from '.';
import { ctx2D } from '../types';

export class ConicGradient extends Gradient {
  type: 'conic';

  constructor(...colors: GradientStop[]) {
    super('conic', ...colors);
  }

  toString(ctx: ctx2D, xPos: number, yPos: number, _width: number, _height: number) {
    //@ts-ignore
    let grad = ctx.createConicGradient(0, xPos, yPos);

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
