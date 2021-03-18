interface Env {
  GOOGLE_RECAPTCHA_SITE_KEY?: string;
}

export const env: Env = {};

export async function initEnv() {
  const response = await fetch('/-/env');
  if (response.status !== 200) {
    throw response;
  }
  return response.json();
}
