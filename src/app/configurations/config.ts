const mode = 'prod';

const prodContext = '/accessible-audio-guide';
const devContext = '';

export const config = {
  context: mode === 'prod'
    ? prodContext
    : devContext,
  mode
};
