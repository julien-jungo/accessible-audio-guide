import { Element } from '../../services/content.service';
import { ISwipeCommand } from "./ISwipeCommand";

export class GoToPreviousElement implements ISwipeCommand {
  description = 'Zum letzten Text (linear)';

  findIndex(elements: Element[], i: number) {
    return Math.max(i - 1, 0);
  }
}
