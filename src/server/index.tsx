import App from '../App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'use-http';

type Context = {
  url?: string;
};

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', (req, res) => {
    const context: Context = {};
    const sheet = new ServerStyleSheet();
    let markup;
    let styleTags;

    const fetchOptions = {
      headers: {
        ...(process.env.RAZZLE_GITHUB_TOKEN
          ? { Authorization: `token ${process.env.RAZZLE_GITHUB_TOKEN}` }
          : {}),
      },
    };

    try {
      markup = renderToString(
        sheet.collectStyles(
          <Provider url={process.env.RAZZLE_API_URL} options={fetchOptions}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </Provider>
        )
      );

      styleTags = sheet.getStyleTags();
    } catch (error) {
      console.error('SSR error', error);
    } finally {
      sheet.seal();
    }

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>

        <script type="text/javascript" id="env">
          window.__API_URL__ = "${process.env.RAZZLE_API_URL}";
          window.__GITHUB_TOKEN__ = "${process.env.RAZZLE_GITHUB_TOKEN}";
        </script>
    </body>
</html>`
      );
    }
  });

export default server;
