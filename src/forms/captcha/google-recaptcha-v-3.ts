import { Captcha } from './captcha';

declare const grecaptcha;

export class GoogleRecaptchaV3 implements Captcha {
  constructor(
    private readonly siteKey,
  ) {
  }

  // https://developers.google.com/recaptcha/docs/v3
  async bind() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // https://developers.google.com/recaptcha/docs/v3#programmatically_invoke_the_challenge
  async getToken() {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(this.siteKey, { action: 'submit' })
          .then(token => resolve(token))
          .catch(reject);
      });
    });
  }
}
