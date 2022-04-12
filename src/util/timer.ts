export class Timer {
  public name: string;
  public startTime: Date;
  private lastTime: Date;

  constructor(name: string) {
    this.name = name;
  }

  public start() {
    this.startTime = new Date();
    this.lastTime = new Date();
    return this;
  }

  public step(): this;
  public step(name?: string): this;
  public step(name?: string) {
    const diff = this.diff();
    if (name) {
      console.log(this.name, '-', name, ':', diff, 'ms');
    } else {
      console.log(this.name, ':', diff, 'ms');
    }
    this.lastTime = new Date();
    return this;
  }

  public stop() {
    const complete = new Date().getTime() - this.startTime.getTime();
    console.log(this.name, 'took', ':', complete, 'ms');
  }

  private diff() {
    return new Date().getTime() - this.lastTime.getTime();
  }
}
