import * as next from 'next';
import * as path from 'path';
import * as compression from 'compression';
import * as express from 'express';
import * as Cache from 'lru-cache';
import { ServerOptions } from 'next-server';
import router from '../routes';

const port: number = 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev, xPoweredBy: false, dir: path.resolve('src') } as ServerOptions);
const handle = router.getRequestHandler(app);
const server = express();
const cache = new Cache({
  max: 100,
  maxAge: 1000 * 60,
});

const InitializeNextApp = async () => {
  await app.prepare();
};

const runExpress = () => {
  server.use(compression());

  server.use(express.static(path.resolve('public')));

  /**
   * Cache Example
   */
  server.get('/event/:eventId', renderAndCache);

  /**
   * Normal case
   */
  server.get('*', (req: express.Request, res: express.Response) => {
    res.removeHeader('X-Powered-By');
    return handle(req, res);
  });

  /**
   * Listen
   */
  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

function renderAndCache(req: express.Request, res: express.Response) {
  return router.getRequestHandler(app, async ({ req, res, route, query }: any) => {
    const { page, keyNames } = route;
    const cacheKey = req.url;

    if (cache.has(cacheKey)) {
      res.setHeader('X-Cache', 'HIT');
      console.log('HIT')
      res.send(cache.get(cacheKey));
      return;
    }

    try {
      const newQuery: any = {};
      keyNames.forEach((keyName: string) => {
        newQuery[keyName] = query[keyName];
      });
      const html = await app.renderToHTML(req, res, page, newQuery);

      if (res.statusCode !== 200) {
        res.send(html);
        return;
      }

      cache.set(cacheKey, html);
      res.setHeader('X-Cache', 'MISS');
      console.log('MISS')
      res.send(html);
    } catch (e) {
      const errorHtml = await app.renderError(e, req, res, page);
      res.send(errorHtml);
    }
  })(req, res);
}

InitializeNextApp().then(runExpress);
