import 'core-js/features/promise';
import { FORM_NAME_KEY } from './constants';
import { Form } from './form';
import { initCaptcha } from './captcha/captcha';

function detectForms() {
  return Array
    .from(document.getElementsByTagName('form'))
    .filter(form => form.hasAttribute(FORM_NAME_KEY));
}

async function init(forms: HTMLFormElement[] = detectForms()) {
  await initCaptcha();
  return forms.map(form => new Form(form));
}

export const Forms = {
  Form,
  init,
};
