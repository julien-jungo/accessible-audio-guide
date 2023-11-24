import swipeBehaviorV1 from "../behaviors/SwipeBehaviorV1";
import swipeBehaviorV2 from "../behaviors/SwipeBehaviorV2";

const isProd = true;

const prodContext = '/accessible-audio-guide';
const devContext = '';

const variant = 'V2';

const swipeBehaviors = {
  'V1': swipeBehaviorV1,
  'V2': swipeBehaviorV2,
}

export const config = {
  isProd,
  variant,
  context: isProd ? prodContext : devContext,
  swipeBehavior: swipeBehaviors[variant],
};
