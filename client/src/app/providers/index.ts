import compose from 'compose-function';

import { QueryClient } from './query-client';
import { themeBackground } from './theme-background';
import { withRouter } from './with-router';

export const withProviders = compose(withRouter, QueryClient, themeBackground);
