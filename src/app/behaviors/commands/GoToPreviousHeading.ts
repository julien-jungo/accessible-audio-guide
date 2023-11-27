import { Element } from '../../services/content.service';
import { ISwipeCommand } from "./ISwipeCommand";

export class GoToPreviousHeading implements ISwipeCommand {
  description = 'Zur letzten Überschrift (linear)';

  findIndex(elements: Element[], i: number) {
    const segment = elements.slice(0, i).reverse();
    const prev = segment.find(e => e.tag.charAt(0) === 'h');
    return (prev) ? elements.indexOf(prev) : i;
  }
}
