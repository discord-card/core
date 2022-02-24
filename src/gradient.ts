import { CanvasRenderingContext2D as ctx2D } from 'canvas';

type GradientStop = { offset: number; color: string } | { off: number; col: string } | [number | string];
export class Gradient {
  type: 'linear' | 'radial';
  colors: { offset: number; color: string }[];
  grad: CanvasGradient;

  constructor(type: 'linear' | 'radial' = 'linear', ...colors: GradientStop[]) {
    this.type = type;
    const arr = colors ?? [];
    this.colors = [];
    for (const stop of arr) {
      if (typeof stop['offset'] === 'number') {
        this.colors.push(stop as any);
      } else if (typeof stop['off'] === 'number') {
        this.colors.push({
          offset: stop['off'],
          color: stop['col'],
        });
      } else {
        this.colors.push({
          offset: stop[0],
          color: stop[1],
        });
      }
    }
  }

  addColorStop(offset: number, color: string) {
    this.colors.push({ offset, color });
  }

  toString(ctx: ctx2D) {
    var grad =
      this.type === 'linear'
        ? ctx.createLinearGradient(0, 0, ctx.w, ctx.h)
        : ctx.createRadialGradient(ctx.w / 2, ctx.h / 2, ctx.w / 2, ctx.w / 2, ctx.h / 2, ctx.w / 2);

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
