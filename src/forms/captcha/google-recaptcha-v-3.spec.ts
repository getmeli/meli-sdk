import { GoogleRecaptchaV3 } from './google-recaptcha-v-3';
import any = jasmine.any;
import objectContaining = jasmine.objectContaining;

describe('GoogleRecaptchaV3', () => {

  let googleRecaptchaV3: GoogleRecaptchaV3;

  beforeEach(() => {
    googleRecaptchaV3 = new GoogleRecaptchaV3('siteKey');
  });

  afterEach(() => jest.restoreAllMocks());

  describe('bind', () => {

    it('should bind captcha', async () => {
      const script = {
        onload: undefined,
      };

      (global as any).document = {
        createElement: jest.fn().mockReturnValue(script),
        body: {
          appendChild: jest.fn(),
        },
      };

      const promise = googleRecaptchaV3.bind();
      script.onload(); // simulate browser call
      await promise;

      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(document.body.appendChild).toHaveBeenCalledWith(objectContaining({
        type: 'text/javascript',
        src: 'https://www.google.com/recaptcha/api.js?render=siteKey',
        onload: any(Function),
        onerror: any(Function),
      }));
    });

    it('should intercept load error', async () => {
      const script = {
        onerror: undefined,
      };

      (global as any).document = {
        createElement: jest.fn().mockReturnValue(script),
        body: {
          appendChild: jest.fn(),
        },
      };

      const promise = googleRecaptchaV3.bind();
      let error = undefined;
      try {
        script.onerror(new Error()); // simulate error
        await promise;
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });

  });

});
