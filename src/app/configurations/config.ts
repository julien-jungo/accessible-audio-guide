import { SwipeStrategyV1 } from "../strategies/SwipeStrategyV1";
import { SwipeStrategyV2 } from "../strategies/SwipeStrategyV2";

const isProd = true;

const prodContext = '/accessible-audio-guide';
const devContext = '';

const variant = 'V2';

const swipeStrategies = {
  'V1': SwipeStrategyV1,
  'V2': SwipeStrategyV2,
}

export const config = {
  isProd,
  variant,
  context: isProd ? prodContext : devContext,
  swipeStrategy: swipeStrategies[variant],
};
