import { Canvas, Image } from 'canvas';
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

export type ColorResolvable = `#${string}` | Gradient;
export type ImageResolvable = Canvas | Image | Buffer | string;

export type Theme = {
  color: ColorResolvable;
  image: ImageResolvable;
  font?: string;
};
