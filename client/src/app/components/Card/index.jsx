"use client";

import Image from "next/image";
import PropTypes from "prop-types";

import { Card } from "@tremor/react";

ReviewerInfoCard.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.string,
  className: PropTypes.string,
  onHandleClick: PropTypes.func,
  isActive: PropTypes.bool,
  reviewerInfo: PropTypes.object,
};

export default function ReviewerInfoCard({
  title,
  isActive,
  avatar,
  className,
  onHandleClick,
  reviewerInfo = {},
}) {
  return (
    <div
      type="button"
      className={`cursor-pointer`}
      onClick={() => onHandleClick(reviewerInfo)}
    >
      <Card
        className={` border-2 border-transparent animate-swipeIn flex gap-4 p-2  ${className}  ${
          isActive ? "border-cyan-950 bg-cyan-100" : " "
        }`}
      >
        <Image
          style={{ borderRadius: "50%", backgroundColor: "white" }}
          src={avatar}
          width={70}
          height={70}
          alt="Author profile"
        />
        <div className="flex items-center col-span-3 font-semibold text-l min-w-40 text-ellipsis	">
          {title}
        </div>
      </Card>
    </div>
  );
}
