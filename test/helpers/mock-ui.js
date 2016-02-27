import UI from 'models/ui';
import through from 'through';

export default class MockUI extends UI {
  constructor() {
    super({
      inputStream: through(),
      outputStream: through(data => this.output += data),
      errorStream: through(data => this.errors += data)
    });
    this.output = '';
    this.errors = '';
  }

  clear() {
    this.output = '';
    this.errors = '';
  }
}

