import { Canvas, Image, CanvasRenderingContext2D as ctx2D } from 'canvas';
import { Gradient } from './gradient';

export interface GuildMemberLike {
  user: {
    tag: string;
    displayAvatarURL(options?: { dynamic?: boolean; format?: 'gif' | 'webp' | 'png' | 'jpg' | 'jpeg' }): string;
  };
  guild: {
    memberCount: number;
  };
}

export type Style = string | CanvasGradient | CanvasPattern;
export type ColorResolvable = `#${string}` | Gradient;
export type ImageResolvable = Canvas | Image | Buffer | string;

export type Theme = {
  color: ColorResolvable;
  image: ImageResolvable;
  font?: string;
};


declare global {
  interface CanvasRenderingContext2D {
    width: number;
    w: number;
    height: number;
    h: number;
    theme: Theme;

    roundRect(x: number, y: number, w: number, h: number, r: number): this;
    changeFont(font: string): this;
    changeFontSize(size: string): this;
    blur(strength: number): this;
  }
}

interface Options {
  rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  font?: string;
  stroke?: boolean;
  verbose?: boolean;
  lineHeight?: number;
  minFontSize?: number;
  maxFontSize?: number;
}

declare function drawMultilineText(ctx: CanvasRenderingContext2D | ctx2D, text: string, opts?: Options): number;
