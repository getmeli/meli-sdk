import { FORM_NAME_KEY } from './constants';
import { captcha } from './captcha/captcha';
import { EventEmitter } from './event-emitter';

export class Form extends EventEmitter {

  private listener?: EventListenerOrEventListenerObject;

  get name() {
    return this.form.getAttribute(FORM_NAME_KEY);
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

    this.listener = event => {
      event.preventDefault();

      captcha.instance.getToken()
        .then(token => this.submit(token))
        .then(() => {
          this.emit('submitted');
        })
        .catch(err => {
          this.on('error', err);
        });
    };

    this.form.addEventListener('submit', this.listener);
  }

  async submit(token): Promise<void> {
    try {
      const data = new FormData(this.form);
      const response = await fetch(`/-/forms/${this.name}`, {
        method: 'post',
        headers: {
          'Token': token,
        },
        body: data,
      });
      if (response.status !== 204) {
        throw response;
      }
      this.emit('submitted');
    } catch (e) {
      this.emit('error', e);
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
  };
}
