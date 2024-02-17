export const getUserProfilePic = (userName = "") => {
	return `https://avatars.githubusercontent.com/${userName}`;
};

export const COMMON_DASHBOARD_CARD_INFO = {
	title: "Dashboard",
};

export const DASHBOARD_TYPE = {
	REVIEWER_INFO: "reviewerinfo",
	COMMON_DASHBOARD: "dashboard",
};

export const PR_STATS_DOMAIN_URL =
	"https://pr-stats.venkadeshrenugadevi.workers.dev";

export const GITHUB_ACTION_DOMAIN_URL =
	"https://api.github.com/repos/Venkadeshkissflow/kf-pr-dashboard";

export const TOP_REVIEWERS_COUNT = 5;
