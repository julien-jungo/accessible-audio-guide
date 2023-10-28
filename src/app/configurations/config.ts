const isProd = true;

const prodContext = '/accessible-audio-guide';
const devContext = '';

export const config = {
  context: isProd
    ? prodContext
    : devContext,
  isProd
};
