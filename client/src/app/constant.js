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

export const PR_STATS_DOMAIN_URL = "http://localhost:8787";
// export const PR_STATS_DOMAIN_URL =
// 	"https://pr-stats.venkadeshrenugadevi.workers.dev";

export const GITHUB_ACTION_DOMAIN_URL = "https://api.github.com/repos";

export const TOP_REVIEWERS_COUNT = 5;

export const TIME_RANGE = {
	LAST_30DAYS: { id: "last-30days", label: "last 30 days" },
	LAST_15DAYS: { id: "last-15days", label: "last 15 days" },
	LAST_ONEWEEK: { id: "last-1week", label: "last 1 week" },
};

export const TIME_PERIOD = {
	LAST_3_MONTHS: "last-3-months",
	LAST_6_MONTHS: "last-6-months",
	THIS_YEAR: "this-year",
	LAST_YEAR: "last-year",
	DEFAULT: "this-year",
};
