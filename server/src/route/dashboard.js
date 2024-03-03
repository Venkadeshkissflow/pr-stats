import { Hono } from 'hono';
const dashboardRoute = new Hono();

import { getAuthorList, getAuthorInfo } from '../service/author.js';
import { getDasboardForAuthor } from '../service/review.js';

dashboardRoute.get('/author', async (ctx) => {
	// return all users;
	const authorList = await getAuthorList(ctx);
	return ctx.json(authorList);
});

dashboardRoute.get('/author/:authorId', async (ctx) => {
	// return all users;
	console.log(ctx.req.param().authorId, 'authorId crcta ?');
	const [authorInfo] = await getAuthorInfo(ctx, ctx.req.param().authorId);
	return ctx.json(authorInfo);
});

dashboardRoute.get('/commentsCount', async (ctx) => {
	const listOfAuthors = await getAuthorList(ctx);
	const totalCommentsCount = listOfAuthors.reduce((accumulator, currentValue) => accumulator + currentValue.totalComments, 0);
	return ctx.json({ commentsCount: totalCommentsCount });
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
