import { EventEmitter } from './event-emitter';

describe('EventEmitter', () => {

  afterEach(() => jest.restoreAllMocks());

  describe('on', () => {

    it('should call listener on registered event', async () => {
      const emitter = new EventEmitter();

      const mock1 = jest.fn();
      const mock2 = jest.fn();
      emitter.on('event1', mock1);
      emitter.on('event2', mock2);

      emitter.emit('event1', 'hey');

      expect(mock1).toHaveBeenCalledWith('hey');
      expect(mock2).not.toHaveBeenCalled();
    });

  });

  describe('removeEventListener', () => {

    it('should remove listener', async () => {
      const emitter = new EventEmitter();

      const mock1 = jest.fn();
      emitter.on('event1', mock1);
      emitter.removeListener('event1', mock1);

      emitter.emit('event1', 'hey');

      expect(mock1).not.toHaveBeenCalled();
    });

  });

});
