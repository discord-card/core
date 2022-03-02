import { CanvasRenderingContext2D as ctx2D, CanvasGradient } from 'canvas';

type GradientType = 'linear' | 'radial' | 'conic';
type GradientStop = { offset: number; color: string } | { off: number; col: string } | [number | string];

export abstract class Gradient {
  public readonly type: GradientType;
  public colors: { offset: number; color: string }[];

  constructor(type: GradientType, ...colors: GradientStop[]) {
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

  public addColorStop(offset: number, color: string) {
    this.colors.push({ offset, color });
  }

  public abstract toString(ctx: ctx2D): CanvasGradient;
  public abstract toString(ctx: ctx2D, x: number, y: number): CanvasGradient;
  public abstract toString(ctx: ctx2D, x: number, y: number, w: number, h: number): CanvasGradient;
}

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

export class RadialGradient extends Gradient {
  type: 'radial';

  constructor(...colors: GradientStop[]) {
    super('radial', ...colors);
  }

  toString(ctx: ctx2D, xPos?: number, yPos?: number, width?: number, height?: number) {
    const cW = ctx.w,
      cH = ctx.h;

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
        radius = ctx.h / 2;
        grad = ctx.createRadialGradient(xPos, yPos, radius, xPos, yPos, radius);
      }
    } else {
      grad = ctx.createRadialGradient(cW / 2, cH / 2, cW / 2, cW / 2, cH / 2, cW / 2);
    }

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}

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
