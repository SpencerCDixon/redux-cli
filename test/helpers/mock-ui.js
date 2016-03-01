import UI from 'models/ui';
import through from 'through';

export default class MockUI extends UI {
  constructor(writeLevel) {
    super({
      inputStream: through(),
      outputStream: through(data => this.output += data),
      errorStream: through(data => this.errors += data)
    });
    this.output = '';
    this.errors = '';
    this.writeLevel = writeLevel;
  }

  clear() {
    this.output = '';
    this.errors = '';
  }
}

