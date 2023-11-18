export interface ISwipeStrategy {
  onSwipeLeft:  (i: number) => number;
  onSwipeRight: (i: number) => number;
  onSwipeDown:  (i: number) => number;
  onSwipeUp:    (i: number) => number;
}
