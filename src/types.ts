import { Canvas, Image } from 'canvas';
import { Gradient } from './gradient';

export interface GuildMemberLike {
  user: {
    tag: string;
    // @discordjs/rest/ImageURLOptions
    displayAvatarURL(options: {
      /**
       * Whether or not to prefer the static version of an image asset.
       */
      forceStatic?: boolean;
      /**
       * The extension to use for the image URL
       *
       * @defaultValue `'webp'`
       */
      extension?: 'webp' | 'png' | 'jpg' | 'jpeg' | 'gif';
      /**
       * The size specified in the image URL
       */
      size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
    }): string;
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

export { CanvasRenderingContext2D as ctx2D } from 'canvas';
