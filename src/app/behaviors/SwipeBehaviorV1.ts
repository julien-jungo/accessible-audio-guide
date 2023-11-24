import { ISwipeBehavior } from "./ISwipeBehavior";
import { GoToNextElement } from "./commands/GoToNextElement";
import { GoToPreviousElement } from "./commands/GoToPreviousElement";
import { GoToPreviousHeading } from "./commands/GoToPreviousHeading";
import { GoToNextHeading } from "./commands/GoToNextHeading";

const swipeBehaviorV1: ISwipeBehavior = {
  swipeRightCommand: new GoToNextElement(),
  swipeLeftCommand:  new GoToPreviousElement(),
  swipeDownCommand:  new GoToNextHeading(),
  swipeUpCommand:    new GoToPreviousHeading()
};

export default swipeBehaviorV1;
