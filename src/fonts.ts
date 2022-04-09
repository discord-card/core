import { GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';

function path(...paths: string[]) {
  return join(__dirname, '..', ...paths);
}

GlobalFonts.registerFromPath(path('fonts/segoeui.ttf'), 'SegoeUI');
GlobalFonts.registerFromPath(path('fonts/seguiemj.ttf'), 'SegoeUIEmoji');
