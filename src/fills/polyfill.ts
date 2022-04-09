import { CanvasRenderingContext2D as ctx2D } from '@napi-rs/canvas';
import { roundRect, changeFont, changeFontSize, blur } from '../util/lib';

ctx2D.prototype.roundRect = roundRect;
ctx2D.prototype.changeFont = changeFont;
ctx2D.prototype.changeFontSize = changeFontSize;
ctx2D.prototype.blur = blur;
