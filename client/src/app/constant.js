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
