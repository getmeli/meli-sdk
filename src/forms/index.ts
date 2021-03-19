import { FORM_NAME_KEY } from './constants';
import { Form } from './form';
import { initCaptcha } from './captcha/captcha';
import { initEnv } from '../env';
import Debug from 'debug';

const debug = Debug('forms:index');

function detectForms() {
  return Array
    .from(document.getElementsByTagName('form'))
    .filter(form => form.hasAttribute(FORM_NAME_KEY));
}

async function init(forms: HTMLFormElement[] = detectForms()) {
  debug('initializing forms', detectForms());

  await initEnv();
  await initCaptcha();

  debug('binding forms', forms);
  return forms.map(form => new Form(form));
}

export default {
  Form,
  init,
};
