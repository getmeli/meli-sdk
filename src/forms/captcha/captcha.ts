import { env } from '../../env';
import { GoogleRecaptchaV3 } from './google-recaptcha-v-3';
import Debug from 'debug';

const debug = Debug('forms:captcha');

export interface Captcha {
  bind(): Promise<any>;

  getToken(): Promise<any>;
}

export const captcha: { instance?: Captcha } = {};

export function initCaptcha() {
  debug('init captcha');

  if (env.GOOGLE_RECAPTCHA_SITE_KEY) {
    debug('Using Google Recaptcha v3');
    captcha.instance = new GoogleRecaptchaV3(env.GOOGLE_RECAPTCHA_SITE_KEY);
  }

  if (!captcha.instance) {
    console.warn('Captcha is disabled');
    captcha.instance = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      async bind(): Promise<any> {

      },
      async getToken(): Promise<any> {
        return undefined;
      },
    };
  }

  return captcha.instance.bind();
}
