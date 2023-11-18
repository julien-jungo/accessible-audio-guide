import { ISwipeStrategy } from './ISwipeStrategy';
import { Element } from '../services/content.service';

export class SwipeStrategyV2 implements ISwipeStrategy {
  constructor(private readonly elements: Element[]) {}

  onSwipeLeft(curr: number): number {
    const current = this.elements.at(curr)!;

    for (let i = curr - 1; i >= 0; i--) {
      const cmp = this.compareLevel(
        current.tag, this.elements.at(i)!.tag);

      if (cmp === 0) {
        return i;
      } else if (cmp > 0) {
        return curr;
      }
    }

    return curr;
  }

  onSwipeRight(curr: number): number {
    const current = this.elements.at(curr)!;

    for (let i = curr + 1; i < this.elements.length; i++) {
      const cmp = this.compareLevel(
        current.tag, this.elements.at(i)!.tag);

      if (cmp === 0) {
        return i;
      } else if (cmp > 0) {
        return curr;
      }
    }

    return curr;
  }

  onSwipeDown(curr: number): number {
    const current = this.elements.at(curr)!;

    for (let i = curr + 1; i < this.elements.length; i++) {
      const cmp = this.compareLevel(
        current.tag, this.elements.at(i)!.tag);

      if (cmp < 0) {
        return i;
      } else {
        break;
      }
    }

    return curr;
  }

  onSwipeUp(curr: number): number {
    const current = this.elements.at(curr)!;

    for (let i = curr - 1; i >= 0; i--) {
      const cmp = this.compareLevel(
        current.tag, this.elements.at(i)!.tag);

      if (cmp > 0) {
        return i;
      } else {
        continue;
      }
    }

    return curr;
  }

  private compareLevel(a: string, b: string) {
    const levelA = this.getLevel(a);
    const levelB = this.getLevel(b);

    return levelA && levelB
      ? levelA - levelB
      : levelA
        ? -1
        : levelB
          ? 1
          : 0;
  }

  private getLevel(tag: string) {
    return tag.charAt(0) === 'h'
      ? +tag.charAt(1)
      : undefined;
  }
}
