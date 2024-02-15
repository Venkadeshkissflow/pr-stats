export async function addReviews(ctx, review) {
	let { author, reviews } = review;
	const stmt = ctx.env.DB.prepare(`INSERT OR IGNORE INTO review(id, authorId, pullRequestId, commentsCount, timeToReview, submittedAt) 
  VALUES(?1, ?2, ?3, ?4, ?5, ?6) ON CONFLICT(id) DO NOTHING`);

	// const r = await ctx.env.DB.batch([ctx.env.DB.prepare('PRAGMA table_info(review)')]);

	// console.log("table info === ", JSON.stringify(r, 2))

	const batchStmt = reviews.map((review) => {
		return stmt.bind(review.id, author.id, review.pullRequestId, review.commentsCount, review.timeToReview, review.submittedAt);
	});
	const res = await ctx.env.DB.batch(batchStmt);
	console.log(' batch response ===== ', res);
	return { success: res[0].success };
}

export async function getDasboardForAuthor(ctx, filter = {}) {
	//filter = {authorId: "" | [""], startDate, endDate}
	let condition = [];
	console.log('filter object ', filter);
	if (filter.authorId) {
		condition.push(`authorId=?1`);
	}
	switch (filter.startDate) {
		case 'last 3 months':
			condition.push(`submittedAt > date("now", "-3 months")`);
			break;
		case 'last 6 months':
			condition.push(`submittedAt > date("now", "-6 months")`);
			break;
		case 'this year':
			condition.push(`submittedAt > date("now", "start of year")`);
			break;
		case 'last year':
			condition.push(`submittedAt > date("now", "-1 years")`);
			break;
	}
	const res = await ctx.env.DB.prepare(
		`SELECT pullRequestId, SUM(timeToReview) as reviewTime, SUM(commentsCount) as commentsCount, submittedAt FROM review ${
			condition.length > 0 ? `where ${condition.join(' AND ')}` : ''
		} GROUP BY pullRequestId ORDER BY submittedAt`
	)
		.bind(filter.authorId)
		.all();
	return res.results;
}
