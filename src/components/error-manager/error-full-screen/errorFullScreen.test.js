import { ErrorFullScreenPure } from './errorFullScreen';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

describe('errorFullScreen', () => {
    testRender(ErrorFullScreenPure, { translations: {}, onRedirectButtonClicked: () => {}, fatalError: {
            messageTranslationKey: 'errorMessage__userFetchFailure',
            redirectButtons: [{
                link: '/logout',
                textKey: 'errorMessage__userFetchFailure--button'
            }]
        }  })();
});