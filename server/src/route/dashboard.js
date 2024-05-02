import { Hono } from 'hono';
const dashboardRoute = new Hono();

import { getAuthorList, getAuthorInfo, getAuthorReviewedPrList, getPrReviewersList } from '../service/author.js';
import { getDasboardForAuthor } from '../service/review.js';

dashboardRoute.get('/author', async (ctx) => {
	const authorList = await getAuthorList(ctx);
	return ctx.json(authorList);
});

dashboardRoute.get('/author/:authorId', async (ctx) => {
	const [authorInfo] = await getAuthorInfo(ctx, ctx.req.param().authorId);
	return ctx.json(authorInfo);
});

dashboardRoute.get('/author/reviewedpr/list/:authorId', async (ctx) => {
	const reviewedPrList = await getAuthorReviewedPrList(ctx, ctx.req.param().authorId);
	return ctx.json(reviewedPrList);
});

dashboardRoute.get('/pullrequest/reviwers/list/:prId', async (ctx) => {
	const reviewersList = await getPrReviewersList(ctx, ctx.req.param().prId);
	return ctx.json(reviewersList);
});

dashboardRoute.get('/author/stats/:authorId', async (ctx) => {
	// return all dashboard metric for given user;
	const searchParams = ctx.req.query();
	console.log(' serach params ', JSON.stringify(searchParams));
	const reviewList = await getDasboardForAuthor(ctx, { authorId: ctx.req.param().authorId, ...searchParams });
	return ctx.json({
		totalReviewedPr: reviewList.length,
		reviews: reviewList,
	});
});

export { dashboardRoute };
