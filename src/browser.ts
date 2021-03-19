import 'core-js/features/promise';
import Forms from './forms';

const Meli = {
  Forms,
};

if (window && !(window as any).Meli) {
  (window as any).Meli = Meli;

  const me = document.querySelector('script[data-meli-init]');

  if (!me || me.getAttribute('data-meli-init') !== 'false') {
    // eslint-disable-next-line no-console
    Meli.Forms.init().catch(console.error);
  }
}

module.exports = Meli;
