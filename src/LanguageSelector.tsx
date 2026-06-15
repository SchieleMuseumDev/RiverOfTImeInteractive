import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };
const refreshPage = () => {
    window.location.reload(); // Reloads the current page
    console.log("HELP");
  };

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      {/* Buttons to switch languages */}
      <button onClick={() => {changeLanguage('en'); refreshPage;}}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
}

export default LanguageSelector;