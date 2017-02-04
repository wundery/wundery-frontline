import Frontline from './services/Frontline';

/**
 * Only expose Frontline to the window object
 */
if (window) {
  window.Frontline = Frontline;
}
