"use client";
import LoadingModal from "@/components/core/LoadingView";
import useTrend from "@/hooks/use-trend";
import { Trends } from "@/utils/trends";
import Image from "next/image";
import React from "react";

const TrendPage = ({
  params: { slug: slug },
}: {
  params: { slug: string };
}) => {
  const {
    data: trend,
    isLoading,
    error,
  }: {
    data: Trends;
    isLoading: boolean;
    error: any;
  } = useTrend(slug);

  if (error?.response?.status === 404) {
    // no post found in style

    return (
      <div>
        <p>No Trend Found</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div>
      <h1>{trend.title}</h1>
      <img
        src={trend.image}
        width={200}
        height={400}
        alt={`${trend.title} 's Banner`}
      />
    </div>
  );
};

export default TrendPage;
