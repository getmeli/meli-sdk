interface Env {
  GOOGLE_RECAPTCHA_SITE_KEY?: string;
}

export const env: Env = {};

let initialized: Promise<void>;

export async function initEnv() {
  if (initialized) {
    return initialized;
  }

  initialized = (async () => {
    const response = await fetch('/-/env');
    if (response.status !== 200) {
      throw response;
    }
    return response.json();
  })();
}
