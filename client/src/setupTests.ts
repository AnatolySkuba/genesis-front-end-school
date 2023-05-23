import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

declare const global: {
  window: typeof window;
  document: typeof window.document;
  navigator: { userAgent: string };
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

jest.mock('hls.js', () => {
  class Hls {
    loadSource() {}

    attachMedia() {}
  }
  return Hls;
});
