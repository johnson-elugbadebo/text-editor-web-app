import { httpAction } from './_generated/server';
import { Liveblocks } from '@liveblocks/node';
import { api } from './_generated/api';
import { generateColor } from '../src/utils';

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

  const userIdentity = await ctx.auth.getUserIdentity();
  if (!userIdentity) {
    return new Response('Unauthorized', {
      status: 401,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  const { room } = await request.json();
  // Handle inbox notifications (no room parameter)
  if (!room) {
    const session = liveblocks.prepareSession(userIdentity.subject, {
      userInfo: {
        name: userIdentity.name ?? userIdentity.email ?? 'Anonymous',
        avatar: userIdentity.pictureUrl,
        color: generateColor(userIdentity.name ?? userIdentity.email ?? 'Anonymous'),
      },
    });

    session.allow('*', session.FULL_ACCESS); // Allow access to all rooms for inbox

    const { body, status } = await session.authorize();
    return new Response(body, {
      status,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        Vary: 'origin',
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

  // console.log({ isOwner, isOrganizationMember });

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
  // console.log('Liveblocks auth - User info:', {
  //   name,
  //   rawName: userIdentity.name,
  //   email: userIdentity.email,
  //   subject: userIdentity.subject,
  // });
  const color = generateColor(name);

  const session = liveblocks.prepareSession(userIdentity.subject, {
    userInfo: {
      name,
      avatar: userIdentity.pictureUrl,
      color,
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
