export async function addAuthor(ctx, author) {
	const res = await ctx.env.DB.prepare(
		`INSERT INTO author(id, name, profileUrl, avatarUrl, totalCommants, timeToReview, totalReviews)
   VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7)
   ON CONFLICT(id) DO 
   UPDATE SET name=?2, profileUrl=?3, avatarUrl=?4, totalCommants=?5, timeToReview=?6, totalReviews=?7
   `
	)
		.bind(author.id, author.login, author.url, author.avatarUrl, author.totalCommants, author.timeToReview, author.totalReviews)
		.all();

	return {
		success: res.success,
	};
}

export async function getAuthorList(ctx, filter) {
	// const rep = await ctx.env.DB.prepare(`SELECT * FROM author`).run();
	// console.log(rep, 'rep statscheck**');
	// return rep.results;
	const { results } = await ctx.env.DB.prepare('SELECT * FROM author').all();
	return results;
}

export async function getAuthorInfo(ctx, id) {
	console.log(id, 'author id crcta ?');
	const { results } = await ctx.env.DB.prepare('SELECT * FROM author WHERE id = ?1').bind(id).all();
	console.log(results, 'results crcta ?');
	return results;
}
