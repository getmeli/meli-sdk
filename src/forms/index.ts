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

function documentReady() {
  if (!document) {
    debug('no document, returning');
    return;
  }
  debug('waiting for document to be ready');
  return new Promise<void>(resolve => {
    // in case the document is already rendered
    if (document.readyState !== 'loading') {
      resolve();
    } else if (document.addEventListener) { // modern browsers
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else { // IE <= 8
      (document as any).attachEvent('onreadystatechange', () => {
        if (document.readyState === 'complete') {
          resolve();
        }
      });
    }
  });
}

async function init(forms?: HTMLFormElement[]): Promise<Form[]> {
  debug('initializing forms', forms);

  await initEnv();
  await initCaptcha();

  let formsToBind = forms;

  if (!forms) {
    await documentReady();
    formsToBind = detectForms();
  }

  debug('binding forms', formsToBind);
  return formsToBind.map(form => new Form(form));
}

export default {
  Form,
  init,
};
