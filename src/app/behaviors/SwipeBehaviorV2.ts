import { ISwipeBehavior } from "./ISwipeBehavior";
import { GoToPreviousSameLevelElement } from "./commands/GoToPreviousSameLevelElement";
import { GoToNextSameLevelElement } from "./commands/GoToNextSameLevelElement";
import { GoToNextLowerLevelElement } from "./commands/GoToNextLowerLevelElement";
import { GoToPreviousHigherLevelElement } from "./commands/GoToPreviousHigherLevelElement";

const swipeBehaviorV1: ISwipeBehavior = {
  swipeRightCommand: new GoToNextSameLevelElement(),
  swipeLeftCommand:  new GoToPreviousSameLevelElement(),
  swipeDownCommand:  new GoToNextLowerLevelElement(),
  swipeUpCommand:    new GoToPreviousHigherLevelElement()
};

export default swipeBehaviorV1;
