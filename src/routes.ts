const nextRoutes = require('next-routes');

const routes = nextRoutes().add({ name: 'index', pattern: '/', page: '/index' });

export const Link = routes.Link;
export default routes;
