import { ErrorFullScreenPure } from './errorFullScreen';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';

describe('errorFullScreen', () => {
    testRender(ErrorFullScreenPure, { translations: {}, fatalError: {
            messageTranslationKey: 'errorMessage__userFetchFailure',
            redirectButton: {
                link: '/logout',
                textKey: 'errorMessage__userFetchFailure--button'
            }
        }  })();
});