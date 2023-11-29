import { Element } from '../../services/content.service';
import { ISwipeCommand } from "./ISwipeCommand";
import ElementUtil from "./util/ElementUtil";

export class GoToPreviousSameLevelElement implements ISwipeCommand {
  description = 'Zum letzten Text gleicher Ebene';

  findIndex(elements: Element[], curr: number) {
    const current = elements.at(curr)!;

    for (let i = curr - 1; i >= 0; i--) {
      const cmp = ElementUtil.compareLevel(
        current.tag, elements.at(i)!.tag);

      if (cmp === 0) {
        return i;
      } else if (cmp > 0) {
        return curr;
      }
    }

    return curr;
  }
}