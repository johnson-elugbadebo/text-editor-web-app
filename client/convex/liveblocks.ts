import { httpAction } from './_generated/server';
import { Liveblocks } from '@liveblocks/node';
import { api } from './_generated/api';

declare const process: { env: Record<string, string | undefined> };

export const auth = httpAction(async (ctx, request) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    const headers = request.headers;
    if (
      headers.get('Origin') !== null &&
      headers.get('Access-Control-Request-Method') !== null &&
      headers.get('Access-Control-Request-Headers') !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }),
      });
    } else {
      return new Response();
    }
  }

  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  });

  const { room } = await request.json();

  const userIdentity = await ctx.auth.getUserIdentity();
  if (!userIdentity) {
    return new Response('Unauthorized', {
      status: 401,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  const document = await ctx.runQuery(api.documents.getDocumentById, { id: room });
  if (!document) {
    return new Response('Document not found', {
      status: 404,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  // Check if user is Owner of document
  const isOwner = document.ownerId === userIdentity.subject;
  // Check if user is member of same organization tied to the document
  const isOrganizationMember = !!(document.organizationId && document.organizationId === userIdentity.organization_id);

  console.log({ isOwner, isOrganizationMember });

  // Do not allow user if user is not owner AND not organization member
  // Allow user if user is owner OR user is organization member
  if (!isOwner && !isOrganizationMember) {
    return new Response('Unauthorized', {
      status: 403,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  const name = userIdentity.name ?? userIdentity.email ?? 'Anonymous';
  const hue = Math.abs(name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % 360;

  const session = liveblocks.prepareSession(userIdentity.subject, {
    userInfo: {
      name,
      avatar: userIdentity.pictureUrl,
      color: `hsl(${hue}, 80%, 60%)`,
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, {
    status,
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      Vary: 'origin',
    }),
  });
});
