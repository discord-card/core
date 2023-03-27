import { Gradient } from '../gradient';
import { ctx2D, Style } from '../types';
import canvasTXT from 'canvas-txt';
import { changeFont, changeFontSize } from './lib';

export class Text {
  public rect: { x: number; y: number; w: number; h: number };
  public text: string;
  public textAlign?: 'center' | 'left' | 'right';
  public style?: Style;
  public gradient?: Gradient;
  public font?: string;
  /** Font size in px */
  public fontSize?: number;
  private multilineOn: boolean;
  private strokeOn: boolean;

  constructor(text: string, posX: number, posY: number) {
    this.text = text;
    this.rect = { x: posX, y: posY, w: 0, h: 0 };
    this.multilineOn = false;
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

  /** Set the width and height of this text   */
  public setRect(w: number, h: number) {
    this.rect.w = w;
    this.rect.h = h;
    return this;
  }

  public multiline() {
    this.multilineOn = !this.multilineOn;
    return this;
  }

  public draw(ctx: ctx2D) {
    // Save before style
    ctx.save();

    /*
    const canvasW = ctx.canvas.width,
      canvasH = ctx.canvas.height;

    if (this.rect.x < 1 && this.rect.y < 1) {
      this.rect.x *= canvasW;
      this.rect.y *= canvasH;
    }
    if (this.rect.w === 0) this.rect.w = canvasW - this.rect.x;
    if (this.rect.h === 0) this.rect.h = canvasH - this.rect.h;

    if (this.rect.w < 1 && this.rect.y < 1) {
      this.rect.w *= canvasW;
      this.rect.h *= canvasH;
    }
    */

    if (this.textAlign) ctx.textAlign = this.textAlign;
    if (this.gradient) {
      this.style = this.gradient.toString(ctx, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }
    if (this.style) {
      ctx.fillStyle = this.style;
      ctx.strokeStyle = this.style;
    }

    if (this.font) changeFont(ctx, this.font);
    if (this.fontSize) changeFontSize(ctx, this.fontSize + 'px');

    if (this.multilineOn) {
      canvasTXT.align = this.textAlign;
      canvasTXT.fontSize = this.fontSize;
      canvasTXT.drawText(ctx as any, this.text, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    } else {
      if (this.strokeOn) {
        ctx.strokeText(this.text, this.rect.x, this.rect.y, this.rect.w);
      } else {
        ctx.fillText(this.text, this.rect.x, this.rect.y, this.rect.w);
      }
    }

    // Restore old style
    ctx.restore();
  }
}
