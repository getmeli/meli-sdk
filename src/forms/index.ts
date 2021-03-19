import { FORM_NAME_KEY } from './constants';
import { Form } from './form';
import { initCaptcha } from './captcha/captcha';
import { initEnv } from '../env';

function detectForms() {
  return Array
    .from(document.getElementsByTagName('form'))
    .filter(form => form.hasAttribute(FORM_NAME_KEY));
}

async function init(forms: HTMLFormElement[] = detectForms()) {
  await initEnv();
  await initCaptcha();
  return forms.map(form => new Form(form));
}

export default {
  Form,
  init,
};
