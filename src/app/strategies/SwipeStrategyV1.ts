import { ISwipeStrategy } from './ISwipeStrategy';
import { Element } from '../services/content.service';

export class SwipeStrategyV1 implements ISwipeStrategy {
  constructor(private readonly elements: Element[]) {}

  onSwipeLeft(i: number): number {
    return Math.max(i - 1, 0);
  }

  onSwipeRight(i: number): number {
    return Math.min(i + 1, this.elements.length - 1);
  }

  onSwipeDown(i: number): number {
    const min = Math.min(i + 1, this.elements.length);
    const segment = this.elements.slice(min, this.elements.length);
    const next = segment.find(e => e.tag.charAt(0) === 'h');
    return (next) ? this.elements.indexOf(next) : i;
  }

  onSwipeUp(i: number): number {
    const max = Math.max(i - 1, 0);
    const segment = this.elements.slice(0, max).reverse();
    const prev = segment.find(e => e.tag.charAt(0) === 'h');
    return (prev) ? this.elements.indexOf(prev) : i;
  }
}
