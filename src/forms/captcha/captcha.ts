import { env } from '../../env';
import { GoogleRecaptchaV3 } from './google-recaptcha-v-3';

export interface Captcha {
  bind(): Promise<any>;

  getToken(): Promise<any>;
}

export const captcha: { instance?: Captcha } = {};

export function initCaptcha() {
  if (env.GOOGLE_RECAPTCHA_SITE_KEY) {
    captcha.instance = new GoogleRecaptchaV3(env.GOOGLE_RECAPTCHA_SITE_KEY);
  }

  if (captcha.instance) {
    captcha.instance = {
      async bind(): Promise<any> {

      },
      async getToken(): Promise<any> {
        return undefined;
      },
    }
  }

  return captcha.instance.bind();
}
