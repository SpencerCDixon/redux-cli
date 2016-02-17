import { setupPrompt } from 'prompts/setup';

describe('(Prompts) #setupPrompt', () => {
  let start, prompt;

  beforeEach(() => {
    start = sinon.spy();
    prompt = { start: start };
    setupPrompt('testing', prompt);
  });

  it('gives the prompt a custom message', () => {
    expect(prompt.message).to.match(/testing/);
  });

  it('sets the delimiter to be an empty string', () => {
    expect(prompt.delimiter).to.eql('');
  });

  it('starts the prompt', () => {
    expect(start.calledOnce).to.be.true;
  });
});
