import Debug from 'debug';

const debug = Debug('forms:env');

interface Env {
  GOOGLE_RECAPTCHA_SITE_KEY?: string;
}

export const env: Env = {};

let initialized: Promise<void>;

export async function initEnv() {
  if (initialized) {
    debug('Env promise already initialized, returning it');
    return initialized;
  }

  debug('Initializing env promise');

  initialized = fetch('/-/env')
    .then(response => {
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    })
    .then(json => {
      Object.entries(json).forEach(([key, val]) => {
        env[key] = val;
      });
    });

  return initialized;
}
