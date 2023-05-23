import { ToastContainer } from 'react-toastify';
import { Footer, Header } from 'courses-components';

import Routing from 'pages';
import { AUTO_CLOSE_TOAST } from 'shared/consts';

import { withProviders } from './providers';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <Routing />
      <Footer />
      <ToastContainer autoClose={AUTO_CLOSE_TOAST} />
    </>
  );
}

export default withProviders(App);
