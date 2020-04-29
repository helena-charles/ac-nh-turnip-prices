function updateContent() {
  update();
  $('body').localize();
}
const defaultLanguage = 'en';
const LANGUAGES = {
  'ca': 'Català',
  'de': 'Deutsch',
  'en': 'English',
  'es-ES': 'Español',
  'fr': 'Français',
  'hu': 'magyar',
  'it': 'Italiano',
  'ja': '日本語',
  'ko': '한국어',
  'nl': 'Nederlands',
  'pt-BR': 'Português',
  'ru': 'Русский',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'th-TH': 'ไทย',
}
i18next
.use(i18nextXHRBackend)
.use(i18nextBrowserLanguageDetector)
.init({
  fallbackLng: defaultLanguage,
  debug: true,
  backend: {
    loadPath: 'locales/{{lng}}.json',
  },
}, (err, t) => {
  languageSelector = $('#language');
  for (let [code, name] of Object.entries(LANGUAGES)) {
    languageSelector.append(`<option value="${code}">${name}</option>`);
  }
  for (let code of i18next.languages) {
    if (code in LANGUAGES) {
      languageSelector.val(code);
      break;
    }
  }
  languageSelector.on('change', function () {
    if (this.value == i18next.language)
      return;
    i18next.changeLanguage(this.value);
  });
  jqueryI18next.init(i18next, $);
  i18next.on('languageChanged', lng => {
    updateContent();
  });
  // init set content
  $(document).ready(initialize);

  let delayTimer;
  $(document).on('input', function() {
    // adding short delay after input to help mitigate potential lag after keystrokes
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
      updateContent();
    }, 1000);
  });

  $('input[type = radio]').on('change', updateContent);
});
