type Args = { [x: string]: unknown; }

export default class EventBus {
  listeners: Record<string, Array<(...args: unknown[]) => void>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (arg1: Args, arg2: Args) => void) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  off(event: string, callback: (arg1: Args, arg2: Args) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: Args[]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => listener(...args));
  }
}
