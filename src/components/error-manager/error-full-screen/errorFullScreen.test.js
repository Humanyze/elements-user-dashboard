import { ErrorFullScreenPure } from './errorFullScreen';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import  ErrorMessageTypes, {MESSAGE_TYPES} from 'Src/redux/common/error/errorMessageTypes';

describe('errorFullScreen', () => {
    // tests render of all fatal errors
    Object.keys(ErrorMessageTypes).filter(key => ErrorMessageTypes[key].type === MESSAGE_TYPES.FATAL).map(key => {
        testRender(ErrorFullScreenPure, { translations: {}, onRedirectButtonClicked: () => {}, fatalError: ErrorMessageTypes[key]})();
    })
});