import { SKRSContext2D as ctx2D } from '@napi-rs/canvas';

export type GradientType = 'linear' | 'radial' | 'conic';
export type GradientStop = { offset: number; color: string } | { off: number; col: string } | [number | string];

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

export * from './Conic';
export * from './Linear';
export * from './Radial';
