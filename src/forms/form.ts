import { FORM_NAME_KEY } from './constants';
import { captcha } from './captcha/captcha';

export class Form {

  private listener?: EventListenerOrEventListenerObject;

  get name() {
    return this.form.getAttribute(FORM_NAME_KEY);
  }

  constructor(
    private readonly form: HTMLFormElement,
  ) {
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
          console.log('submit success');
        })
        .catch(err => {
          console.error('failed to submit form', err);
        });
    };

    this.form.addEventListener('submit', this.listener);
  }

  async submit(token): Promise<void> {
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
  }

  remove() {
    if (!this.listener) {
      return;
    }

    this.form.removeEventListener('submit', this.listener);
    this.listener = undefined;
  };
}
