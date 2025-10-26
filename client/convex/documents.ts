import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

// Create Documents
export const createDocument = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // From Convex docs:
    // Access the authenticated user info stored in the JWT via ctx.auth.getUserIdentity
    // If user isn't authenticated, ctx.auth.getUserIdentity will return null
    const userIdentity = await ctx.auth.getUserIdentity();
    if (userIdentity === null) {
      throw new Error('Unauthorized');
    }

    // console.log({ userIdentity });

    const organizationId = (userIdentity.organization_id ?? undefined) as string | undefined;

    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled document',
      ownerName: userIdentity.name || 'Anonymous User',
      ownerId: userIdentity.subject,
      organizationId,
      organizationRole: userIdentity.organization_role as string | undefined, // Add this line
      initialContent: args.initialContent,
    });
  },
});

// Get Documents
export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, { search, paginationOpts }) => {
    // verify user identity
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error('Unauthorized');
    }

    // console.log({ userIdentity });

    const organizationId = (userIdentity.organization_id ?? undefined) as string | undefined;

    // Search Within Organization
    if (search && organizationId) {
      console.log('LOG 2 ==> SEARCH Within ORG FIRED');
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q => q.search('title', search).eq('organizationId', organizationId))
        .paginate(paginationOpts);
    }

    // Search for User Documents
    if (search) {
      console.log('LOG 1 ==> SEARCH for User DOCS FIRED');
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q => {
          return q.search('title', search).eq('ownerId', userIdentity.subject);
        })
        .paginate(paginationOpts);
    }

    // All Docs Inside Organization
    if (organizationId) {
      console.log('LOG 3 ==> ALL DOCS Within ORG FIRED');
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', q => q.eq('organizationId', organizationId))
        .paginate(paginationOpts);
    }

    // All Personal Docs
    console.log('LOG 4 ==> ALL PERSONAL DOCS FIRED');
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', q => q.eq('ownerId', userIdentity.subject))
      .paginate(paginationOpts);
  },
});

// Get Document by ID
export const getDocumentById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, { id }) => {
    // no authentication
    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  },
});

// Delete Document
export const removeDocumentById = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    // Verify user identity
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error('Unauthorized');
    }

    // console.log('LOG 1:', { userIdentity });
    const organizationId = (userIdentity.organization_id ?? undefined) as string | undefined;

    // Find document
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error('Document not found');
    }

    // const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);
    // console.log('LOG 2:', isOwner);
    // console.log('LOG 3:', isOrganizationMember);

    // Check if user is Owner of document
    const isOwner = document.ownerId === userIdentity.subject;
    // Check if user is admin of organization tied to the document
    const isAdmin = userIdentity.organization_role === 'admin' && document.organizationId === organizationId;

    // Do not allow user to delete if user is not Owner AND not Admin
    // Allow deletion if user is Owner OR user is Admin
    if (!isOwner && !isAdmin) {
      throw new Error('Unauthorized');
    }

    // Delete document
    return await ctx.db.delete(args.id);
  },
});

// Update Document
export const updateDocumentById = mutation({
  args: { id: v.id('documents'), title: v.string() },
  handler: async (ctx, args) => {
    // Verify user identity
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error('Unauthorized');
    }

    // Get user's organizationId
    const organizationId = (userIdentity.organization_id ?? undefined) as string | undefined;

    // Find document
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error('Document not found');
    }

    // Check if user is Owner of document
    const isOwner = document.ownerId === userIdentity.subject;
    // Check if user is member of same organization tied to the document
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

    // Do not allow user to update doc if user is not owner AND not organization member
    // Allow update if user is owner OR user is organization member
    if (!isOwner && !isOrganizationMember) {
      throw new Error('Unauthorized');
    }

    // Update document
    return await ctx.db.patch(args.id, { title: args.title });
  },
});
