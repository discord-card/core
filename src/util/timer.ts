export class Timer {
  public name: string;
  public startTime: Date;
  private lastTime: Date;

  constructor(name: string) {
    this.name = name;
  }

  public start() {
    console.log(this.name, 'starting');
    this.startTime = new Date();
    this.lastTime = new Date();
    return this;
  }

  public step(): this;
  public step(name?: string): this;
  public step(name?: string) {
    const diff = this.diff();
    const whitespace = ''.padStart(4 - (diff + '').length);
    if (name) {
      console.log(whitespace, diff, 'ms', '-', name);
    } else {
      console.log(whitespace, diff, 'ms');
    }
    this.lastTime = new Date();
    return this;
  }

  public stop() {
    const complete = new Date().getTime() - this.startTime.getTime();
    console.log('Finished, took', ':', complete, 'ms');
  }

  private diff() {
    return new Date().getTime() - this.lastTime.getTime();
  }
}
