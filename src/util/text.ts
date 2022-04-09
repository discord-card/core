import { Gradient } from '../gradient';
import { Style } from '../types';
import { CanvasRenderingContext2D as ctx2D } from 'canvas';
import canvasTXT from 'canvas-txt';

export interface MultilineOptions {
  width?: number;
  height?: number;
  lineHeight?: number;
}

export class Text {
  public x: number;
  public y: number;
  public text: string;
  public textAlign?: 'center' | 'left' | 'right';
  public style?: Style;
  public gradient?: Gradient;
  public font?: string;
  /** Font size in px */
  public fontSize?: number;
  private multilineOpts?: MultilineOptions;
  private strokeOn: boolean;

  constructor(text: string, posX: number, posY: number) {
    this.text = text;
    this.x = posX;
    this.y = posY;
    this.strokeOn = false;
  }

  public setFont(font: string) {
    this.font = font;
    return this;
  }
  public setFontSize(size: number) {
    this.fontSize = size;
    return this;
  }
  public setStyle(style: Style) {
    this.style = style;
    return this;
  }
  public setGradient(gradient: Gradient) {
    this.gradient = gradient;
    return this;
  }

  public stroke() {
    this.strokeOn = !this.strokeOn;
    return this;
  }

  public multiline(opts: MultilineOptions) {
    this.multilineOpts = opts ?? {};
    return this;
  }

  public draw(ctx: ctx2D, maxWidth?: number) {
    const before = JSON.parse(
      JSON.stringify({
        font: ctx.font,
        textAlign: ctx.textAlign,
        fillStyle: ctx.fillStyle,
        strokeStyle: ctx.strokeStyle,
      })
    );

    if (this.x < 1 && this.y < 1) {
      this.x *= ctx.canvas.width;
      this.y *= ctx.canvas.height;
    }

    if (this.textAlign) ctx.textAlign = this.textAlign;
    if (this.style) {
      ctx.fillStyle = this.style;
      ctx.strokeStyle = this.style;
    }

    if (this.gradient) {
      const grad = this.gradient.toString(ctx, this.x, this.y, maxWidth ?? ctx.w - this.x, ctx.h - this.y);
      ctx.fillStyle = grad;
      ctx.strokeStyle = grad;
    }

    if (this.font) ctx.changeFont(this.font);
    if (this.fontSize) ctx.changeFontSize(this.fontSize + 'px');

    let maxW: number = maxWidth ?? ctx.w - this.x;

    if (!!this.multilineOpts) {
      let w = this.multilineOpts.width ?? ctx.canvas.width - this.x,
        h = this.multilineOpts.height ?? ctx.canvas.height - this.y;

      const grad = this.gradient.toString(ctx, this.x, this.y, w, h);
      ctx.fillStyle = grad;
      ctx.strokeStyle = grad;

      canvasTXT.lineHeight = this.multilineOpts.lineHeight ?? null;
      canvasTXT.align = this.textAlign;
      canvasTXT.fontSize = this.fontSize;
      canvasTXT.drawText(ctx as any, this.text, this.x, this.y, w, h);
    } else {
      if (this.strokeOn) {
        ctx.strokeText(this.text, this.x, this.y, maxW);
      } else ctx.fillText(this.text, this.x, this.y, maxW);
    }
    Object.assign(ctx, before);
  }
}
