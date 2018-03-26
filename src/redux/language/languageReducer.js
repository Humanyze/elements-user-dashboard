import { handleActions } from 'redux-actions';
import translationDictionary, { languages } from './translations';


export const getSelectedLanguageKey = state => state.language.selectedLanguage;
export const getSelectedLanguage = state => state.language.languages[getSelectedLanguageKey(state)];
export const getCurrentTranslations = state => state.language.currentTextDictionary;

const getCurrentTextDictionaryById = (translationDictionary, id) =>
    Object.keys(translationDictionary).reduce((dict, phraseKey) => ({
        ...dict,
        [phraseKey]: translationDictionary[phraseKey][id]
    }), {});


const initialState = {
    languages,
    selectedLanguage: languages.EN.id,
    currentTextDictionary: getCurrentTextDictionaryById(translationDictionary, languages.EN.id)
};

const languageReducer = handleActions({

}, initialState);


export default languageReducer;