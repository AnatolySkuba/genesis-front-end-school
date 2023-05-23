import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from 'courses-components';

export const withRouter = (component: () => ReactNode) =>
  function () {
    return (
      <BrowserRouter>
        <Suspense fallback={<Loader />}>{component()}</Suspense>
      </BrowserRouter>
    );
  };
