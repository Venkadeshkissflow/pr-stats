import { PR_STATS_DOMAIN_URL, GITHUB_ACTION_DOMAIN_URL } from "@/app/constant";

//Common Repo info dashboard
export async function getContributors() {
	const res = await fetch(
		`${GITHUB_ACTION_DOMAIN_URL}/${userName}/${repoName}/contributors`
	);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

export function getOpenPrList() {
	return fetch(
		`${GITHUB_ACTION_DOMAIN_URL}/${userName}/${repoName}/pulls?state=open`,
		{
			method: "GET",
		}
	).then((res) => res.json());
}

export async function pullRequestList() {
	const res = await fetch(`${GITHUB_ACTION_DOMAIN_URL}/pulls`);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

// export async function getCommentsCount() {
// 	const res = await fetch(`${PR_STATS_DOMAIN_URL}/pr-stats/api/commentsCount`);

// 	if (!res.ok) {
// 		throw new Error("Failed to fetch reviewerInfo");
// 	}

// 	return res.json();
// }

// Author info dashboard
export async function getAuthorInfo(id) {
	const res = await fetch(`${PR_STATS_DOMAIN_URL}/pr-stats/api/author/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

export async function getAuthorPrInfoApi(id) {
	const res = await fetch(
		`${PR_STATS_DOMAIN_URL}/pr-stats/api/author/stats/${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch getAuthorPrInfo");
	}

	return res.json();
}

export async function getReviewedPrsListApi(id) {
	const res = await fetch(
		`${PR_STATS_DOMAIN_URL}/pr-stats/api/author/reviewedpr/list/${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewd prs list");
	}

	return res.json();
}

export async function getPrReviewersListApi(prId) {
	return fetch(
		`${PR_STATS_DOMAIN_URL}/pr-stats/api/pullrequest/reviwers/list/${prId}`,
		{
			method: "GET",
		}
	).then((res) => res.json());
}

export function getAuthorList(queryParam = "") {
	return fetch(`${PR_STATS_DOMAIN_URL}/pr-stats/api/author`, {
		method: "GET",
	}).then((res) => res.json());
}
