//import '@storybook/addon-console';
import { setConsoleOptions, withConsole } from '@storybook/addon-console'

import * as Sentry from '@sentry/browser';

Sentry.init({dsn: "https://3f47561e762e40c09714e26d5bb69a7d@sentry.io/2217600"});
