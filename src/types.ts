import { Canvas, Image, SKRSContext2D as ctx2D } from '@napi-rs/canvas';
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
export type ColorResolvable = string | Gradient;
export type ImageResolvable = Canvas | Image | Buffer | string;

export type Theme = {
  color: ColorResolvable;
  image: ImageResolvable;
  font?: string;
};

export { Canvas, Image, ctx2D };
