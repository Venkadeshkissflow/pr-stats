"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Header, ReviewerInfoCard } from "@/app/components";

import {
  COMMON_DASHBOARD_CARD_INFO,
  DASHBOARD_TYPE,
  getUserProfilePic,
} from "@/app/common.js";

import styles from "./reviewers.module.css";

const MOCK_LIST = [
  {
    id: "saravanan10393",
    name: "manuelmhtr",
    profileUrl: "https://github.com/manuelmhtr",
    avatarUrl: "https://avatars.githubusercontent.com/u/saravanan10393",
  },
  {
    id: "saravanadn10393",
    name: "manuelmhtr",
    profileUrl: "https://github.com/manduelmhtr",
    avatarUrl: "https://avatars.githubusercontent.com/u/saravdanan10393",
  },

  {
    id: "10221219.0",
    name: "saravanan10393",
    profileUrl: "https://github.com/saravanan10393",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/10221219?u=1905df4f6371478119d7fe6e6e68ac7294e90e56&v=4",
  },
];

export default function DashboardLayout({ commoninfo, children }) {
  const reviewersList = useRef([]);
  const [finalList, setFinalList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [activeReviewerId, setActiveReviewerId] = useState({});
  const [dashboardType, setDashboardType] = useState(
    DASHBOARD_TYPE.COMMON_DASHBOARD
  );

  useEffect(() => {
    // fetch(`https://pr-stats.deveditor.workers.dev/pr-stats/api/author`, {
    //   method: "GET",
    //   withCredentials: true,
    //   crossorigin: true,
    //   mode: "no-cors",
    //   "Access-Control-Allow-Origin": "*",
    // }).then((data) => {
    //   console.log("reviewerslist", data);
    //   setReviewersList(MOCK_LIST);
    //   setLoading(false);
    // });
    reviewersList.current = MOCK_LIST;
    setFinalList(MOCK_LIST);
    setLoading(false);
  }, []);

  function onHandleSearch(event) {
    console.log(event.target.value);
    if (event.target.value) {
      const filteredList = reviewersList.current.filter((reviewer) => {
        return reviewer.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

      setFinalList(filteredList);
    } else {
      setFinalList(reviewersList.current);
    }
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.header}>
        <Header pageTitle={"Reviewers list"} />
      </div>
      <div className={styles.reviewerContainer}>
        <div className={styles.reviewerListContainer}>
          <input
            type="search"
            placeholder="Search"
            // value={searchTerm}
            onChange={onHandleSearch}
            className={styles.searchInput}
          />
          <div className={styles.list}>
            <ReviewerInfoCard
              title={COMMON_DASHBOARD_CARD_INFO.title}
              avatar={getUserProfilePic()}
              className={"bg-amber-50 border-2 border-x-amber-600	"}
              isActive={dashboardType === DASHBOARD_TYPE.COMMON_DASHBOARD}
              onHandleClick={() => {
                setDashboardType(DASHBOARD_TYPE.COMMON_DASHBOARD);
                setActiveReviewerId("");
              }}
            />
            <ReviewersList
              onHandleReviewerSelect={(reviewerInfo) => {
                setDashboardType(DASHBOARD_TYPE.REVIEWER_INFO);
                setActiveReviewerId(reviewerInfo.id);
              }}
              activeReviewerId={activeReviewerId}
              reviewersList={finalList}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className={styles.reviwerdData}>
          {dashboardType === DASHBOARD_TYPE.COMMON_DASHBOARD ? (
            <div>{commoninfo}</div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewersList({
  reviewersList,
  isLoading,
  onHandleReviewerSelect,
  activeReviewerId,
}) {
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (reviewersList.length === 0) return <p>No profile data</p>;

  return reviewersList.map((reviewerInfo) => (
    <ReviewerInfoCard
      title={reviewerInfo.name}
      key={reviewerInfo.id}
      isActive={activeReviewerId === reviewerInfo.id}
      avatar={getUserProfilePic(reviewerInfo.name)}
      onHandleClick={() => {
        onHandleReviewerSelect(reviewerInfo);
        router.push(`/dashboard/userinfo/${reviewerInfo.id}`);
      }}
      reviewerInfo={reviewerInfo}
    />
  ));
}
