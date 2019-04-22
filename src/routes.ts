const nextRoutes = require('next-routes');

const routes = nextRoutes()
  .add({ name: 'index', pattern: '/', page: '/index' })
  .add({ name: 'event', pattern: '/event/:eventId', page: '/event' });

export const Link = routes.Link;
export default routes;
