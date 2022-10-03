import {
  Config,
  Translation,
  withTranslation as withTranslationImpl,
} from "wundery-js-lib";
import * as translations from "translations";

// Build translation instance
export const translation = new Translation({
  dictionaries: translations,
  locale: Translation.guessLocaleFromBrowser(),
  fallbackLocale: "en",
});

// Build a HOC wrapping the withTranslation HOC by injecting the translation instance
export const withTranslation = (...args) =>
  withTranslationImpl(...[translation].concat(args));

// Build a central config object
export const config = new Config({ version: VERSION });
