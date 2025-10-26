import { httpRouter } from 'convex/server';
import { auth } from './liveblocks';

const http = httpRouter();

// Handle OPTIONS preflight
http.route({
  path: '/liveblocks/auth',
  method: 'OPTIONS',
  handler: auth,
});

// Mount the Liveblocks auth endpoint
http.route({
  path: '/liveblocks/auth',
  method: 'POST',
  handler: auth,
});

export default http;
