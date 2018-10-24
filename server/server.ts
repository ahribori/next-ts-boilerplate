import { IncomingMessage, ServerResponse } from 'http';
import * as next from 'next';
import * as proxy from 'http-proxy-middleware';
import { ServerOptions } from 'next-server';
import authMiddleware from './authMiddleware';

const express = require('express');

const port: number = 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev, xPoweredBy: false } as ServerOptions);
const handle = app.getRequestHandler();
const server = express();

const InitializeNextApp = async () => {
    await app.prepare();
};

const runExpress = () => {

    /**
     * API Proxy
     */
    server.use('/api', authMiddleware, proxy({
        target: 'http://sandbox-hair-app.beauty.devel.kakao.com',
        pathRewrite: {
            '^/api': '/',
        },
        autoRewrite: true,
        changeOrigin: true,
        onProxyRes: (proxyRes, _req: any, _res: ExpressResponse) => {
            const { statusCode } = proxyRes;
            if (statusCode === 404) {
                return _res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: 'Not found',
                });
            }
        },
    }));

    /**
     * Normal case
     */
    server.get('*', (req: IncomingMessage, res: ServerResponse) => {
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


export interface ExpressResponse extends ServerResponse {
    status: (statusCode: number) => any;
}
