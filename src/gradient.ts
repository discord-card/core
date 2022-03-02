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

  abstract toString(ctx: ctx2D): CanvasGradient;
}

export class LinearGradient extends Gradient {
  type: 'linear';

  constructor(...colors: GradientStop[]) {
    super('linear', ...colors);
  }

  toString(ctX: ctx2D): CanvasGradient;
  toString(ctx: ctx2D, x: number, y: number): CanvasGradient;
  toString(ctx: ctx2D, x: number, y: number, w: number, h: number): CanvasGradient;
  toString(ctx: ctx2D, xPos?: number, yPos?: number, width?: number, height?: number) {
    const cW = ctx.canvas.width,
      cH = ctx.canvas.height;

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

  toString(ctX: ctx2D): CanvasGradient;
  toString(ctx: ctx2D, x: number, y: number, r: number): CanvasGradient;
  toString(ctx: ctx2D, xPos?: number, yPos?: number, radius?: number) {
    const cW = ctx.canvas.width,
      cH = ctx.canvas.height;

    let grad: CanvasGradient;
    if (xPos && yPos && radius) {
      grad = ctx.createRadialGradient(xPos, yPos, radius, xPos, yPos, radius);
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

  toString(ctX: ctx2D): CanvasGradient;
  toString(ctx: ctx2D, startAngle: number, x: number, y: number): CanvasGradient;
  toString(ctx: ctx2D, startAngle?: number, x?: number, y?: number) {
    let grad: CanvasGradient;
    if (startAngle && x && y) {
      //@ts-ignore
      grad = ctx.createConicGradient(startAngle, x, y);
    } else {
      //@ts-ignore
      grad = ctx.createConicGradient(0, 0, 0);
    }

    for (const v of this.colors) grad.addColorStop(v.offset, v.color);

    return grad;
  }
}
