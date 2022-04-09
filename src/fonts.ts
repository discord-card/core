import { registerFont } from '@napi-rs/canvas';
import { join } from 'path';

function path(...paths: string[]) {
  return join(__dirname, '..', ...paths);
}

registerFont(path('fonts/segoeui.ttf'), { family: 'SegoeUI' });
registerFont(path('fonts/seguiemj.ttf'), { family: 'SegoeUIEmoji' });
