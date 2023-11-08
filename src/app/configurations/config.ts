const isProd = true;

const prodContext = '/accessible-audio-guide';
const devContext = '';

const variant = 'V2';

export const config = {
  context: isProd
    ? prodContext
    : devContext,
  isProd,
  variant
};
