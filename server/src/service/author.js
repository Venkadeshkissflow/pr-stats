export async function addAuthor(ctx, author) {
	const res = await ctx.env.DB.prepare(
		`INSERT INTO author(id, name, profileUrl, avatarUrl, totalCommants)
   VALUES(?1, ?2, ?3, ?4, ?5)
   ON CONFLICT(id) DO 
   UPDATE SET name=?2, profileUrl=?3, avatarUrl=?4, totalCommants=?5
   `
	)
		.bind(author.id, author.login, author.url, author.avatarUrl, author.totalCommants)
		.run();

	return {
		success: res.success,
	};
}

export async function getAuthorList(ctx, filter) {
	// const rep = await ctx.env.DB.prepare(`SELECT * FROM author`).run();
	// console.log(rep, 'rep statscheck**');
	// return rep.results;
	const { results } = await ctx.env.DB.prepare(
		"SELECT * FROM author"
	  ).all();
	  return results;
}
