const {JSDOM} = require('jsdom');

const dom = new JSDOM('<!doctype html><html lang="ru"><body><div id="app"></div></body></html>', {
  url: 'http://localhost:3000',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.DocumentFragment = dom.window.DocumentFragment;
global.FormData = dom.window.FormData;

require.extensions['.css'] = (module) => {
  module.exports = {};
}
