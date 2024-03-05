const TIME_PERIOD = {
	LAST_3_MONTHS: 'last-3-months',
	LAST_6_MONTHS: 'last-6-months',
	THIS_YEAR: 'this-year',
	LAST_YEAR: 'last-year',
};

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
		case TIME_PERIOD.LAST_3_MONTHS:
			condition.push(`submittedAt > date("now", "-3 months")`);
			break;
		case TIME_PERIOD.LAST_6_MONTHS:
			condition.push(`submittedAt > date("now", "-6 months")`);
			break;
		case TIME_PERIOD.THIS_YEAR:
			condition.push(`submittedAt > date("now", "start of year")`);
			break;
		case THIS_YEAR.LAST_YEAR:
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
