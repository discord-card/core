import { Canvas, CanvasRenderingContext2D as ctx2D } from 'canvas';
import { roundRect, changeFont, changeFontSize, blur } from '../util/lib';

export function applyToCTX<T>(ctx: ctx2D, func: (a: T) => any): T {
  return func.apply(ctx);
}
