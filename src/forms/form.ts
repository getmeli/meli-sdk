import { FORM_NAME_KEY } from './constants';
import { captcha } from './captcha/captcha';
import { EventEmitter } from '../commons/event-emitter';
import Debug from 'debug';

const debug = Debug('forms:form');

export class Form extends EventEmitter {
  private listener?: EventListenerOrEventListenerObject;

  get name() {
    return this.form.getAttribute(FORM_NAME_KEY);
  }

  debug(...args) {
    debug(this.name, ...args);
  }

  constructor(
    private readonly form: HTMLFormElement,
  ) {
    super();
    this.bootstrap();
  }

  private bootstrap() {
    if (!this.name) {
      throw new Error(`Form is missing a ${FORM_NAME_KEY} attribute`);
    }

    this.debug('bootstraping form');

    this.listener = event => {
      event.preventDefault();

      this.debug('submit listener called');
      this.submit()
        .then(() => {
          this.debug('submitted successfully');
          this.emit('submitted');
        })
        .catch(err => {
          this.debug('submit error', err);
          this.on('error', err);
        });
    };

    this.form.addEventListener('submit', this.listener);

    this.emit('init');
  }

  async submit(): Promise<void> {
    this.debug('submitting');
    this.emit('submitting');
    try {
      const token = await captcha.instance.getToken();
      const data = new FormData(this.form);
      const response = await fetch(`/-/forms/${this.name}`, {
        method: 'post',
        headers: {
          Token: token,
        },
        body: data,
      });
      if (response.status !== 204) {
        this.debug('response status is not 204, throwing error');
        throw response;
      }
    } catch (e) {
      this.debug('catching error, emitting event and re-submitting');
      throw e;
    }
  }

  remove() {
    if (!this.listener) {
      return;
    }

    this.form.removeEventListener('submit', this.listener);
    this.listener = undefined;

    this.emit('removed');
  }

  emit(event: string, data?: any) {
    super.emit(event, data);
    this.form.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}
