type Listener = (data: any) => void;

export class EventEmitter {
  private readonly listeners = new Map<string, Listener[]>();

  on(event: string, listener: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  removeListener(event: string, listener: Listener) {
    const listeners = this.listeners.get(event);
    if (listeners && listeners.length) {
      this.listeners.set(event, listeners.filter(l => l !== listener));
    }
  }

  emit(event: string, data?: any) {
    const listeners = this.listeners.get(event);

    if (listeners && listeners.length) {
      listeners.forEach(listener => {
        listener(data);
      });
    }
  }
}
