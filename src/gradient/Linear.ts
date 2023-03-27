import { Gradient, GradientStop } from '.';
import { ctx2D } from '../types';

export class LinearGradient extends Gradient {
  type: 'linear';

  constructor(...colors: GradientStop[]) {
    super('linear', ...colors);
  }

  toString(ctx: ctx2D, xPos: number, yPos: number, width: number, height: number) {
    let grad = ctx.createLinearGradient(xPos, yPos, xPos + width, yPos + height);

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
