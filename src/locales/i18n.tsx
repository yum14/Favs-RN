// import * as React from 'react';
// import 'intl';
// import 'intl/locale_data/jsonp/ja';
// import 'intl/locale_data/jsonp/en';
// import { IntlProvider } from 'react-intl';
import * as RNLocalize from 'react-native-localize';
import ja from './ja.json';
import en from './en.json';

const SUPPORTED_LOCALE = ['ja', 'en'];
const DEFAULT_LOCALE = 'ja';

const getLocale = (): string => {
  const locales = RNLocalize.getLocales();
  const languageCode = locales[0].languageCode;

  if (SUPPORTED_LOCALE.find(value => value === languageCode)) {
    return languageCode;
  }

  return DEFAULT_LOCALE;
};

interface Messages {
  title_home: string;
  title_category: string;
  bottomTab_home: string;
  bottomTab_category: string;
  favs_menu_copy: string;
  favs_menu_share: string;
  favs_menu_edit: string;
  favs_menu_moveup: string;
  favs_menu_movedown: string;
  favs_menu_delete: string;
  favs_menu_cancel: string;
  favs_delete_dialog_title: string;
  favs_delete_dialog_desc: string;
  favs_delete_dialog_cancel: string;
  favs_delete_dialog_delete: string;
  category_delete_dialog_title: string;
  category_delete_dialog_desc: string;
  category_delete_dialog_cancel: string;
  category_delete_dialog_delete: string;
  fav_edit_title: string;
  fav_edit_cancel: string;
  fav_edit_done: string;
  fav_new_title: string;
  fav_new_cancel: string;
  fav_new_create: string;
  category_edit_title: string;
  category_edit_category: string;
  category_edit_background: string;
  category_new_title: string;
  category_new_category: string;
  category_new_background: string;
  category_new_cancel: string;
  category_new_create: string;
  fav_new_url_required: string;
  fav_new_url_pettern: string;
  category_new_url_required: string;
}

const getLocaleJson = (locale: string): Messages => {
  switch (locale) {
    case 'ja':
      return { ...ja };
    case 'en':
      return {
        ...getLocaleJson('ja'),
        ...en,
      };
    default:
      throw new Error('unknown locale');
  }
};

// export const IntlProviderWrapper = ({ children }: { children: React.ReactNode }) => {
//   const locale = getLocale();
//   return (
//     <IntlProvider locale={locale} messages={{ ...getLocaleJson(locale) }}>
//       {children}
//     </IntlProvider>
//   );
// };
export const getMessages = () => {
  const locale = getLocale();
  return getLocaleJson(locale);
};
