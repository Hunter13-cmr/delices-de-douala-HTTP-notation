
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/restaurant/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2919, hash: 'ec994a46d7510faf67bcc698599567f863d24874c1f87b42e9c21ef62190bd0f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1483, hash: '359bb5b2383b6c3b25b26542df7224676ed01b30f09736059204280e9ddbba5d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 54854, hash: '91c383b20a5f4468eb36b77dcc24b13b19c317c083533eb28bd2f545e651e81c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IAZIXC4U.css': {size: 4159, hash: 'n7MskoIVrPI', text: () => import('./assets-chunks/styles-IAZIXC4U_css.mjs').then(m => m.default)}
  },
};
