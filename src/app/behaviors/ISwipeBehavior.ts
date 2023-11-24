import { ISwipeCommand } from "./commands/ISwipeCommand";

export interface ISwipeBehavior {
  swipeRightCommand: ISwipeCommand,
  swipeLeftCommand:  ISwipeCommand,
  swipeDownCommand:  ISwipeCommand,
  swipeUpCommand:    ISwipeCommand
}
