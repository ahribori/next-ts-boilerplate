import * as next from 'next';
import * as path from 'path';
import * as compression from 'compression';
import * as express from 'express';
import { ServerOptions } from 'next-server';
import router from '../routes';

const port: number = 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev, xPoweredBy: false, dir: path.resolve('src') } as ServerOptions);
const handle = router.getRequestHandler(app);
const server = express();

const InitializeNextApp = async () => {
  await app.prepare();
};

const runExpress = () => {
  server.use(compression());

  server.use(express.static(path.resolve('public')));

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

InitializeNextApp().then(runExpress);
