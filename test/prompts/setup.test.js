import { setupPrompt } from 'prompts/setup';

describe('(Prompts) #setupPrompt', () => {
  let start, prompt;

  beforeEach(() => {
    start = sinon.spy();
    prompt = { start: start };
    setupPrompt('testing', prompt);
  });

  test('gives the prompt a custom message', () => {
    expect(prompt.message).toMatch(/testing/);
  });

  test('sets the delimiter to be an empty string', () => {
    expect(prompt.delimiter).toEqual('');
  });

  test('starts the prompt', () => {
    expect(start.calledOnce).toBe(true);
  });
});
