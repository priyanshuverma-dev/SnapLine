"use client";
import LoadingModal from "@/components/core/LoadingView";
import useTrendsList from "@/hooks/use-trends-list";
import { Trends } from "@/utils/trends";
import React from "react";

const TrendsPage = () => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: Trends[];
    isLoading: boolean;
    error: any;
  } = useTrendsList();

  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((trend) => {
        return <div key={trend.id}>{trend.title}</div>;
      })}
    </div>
  );
};

export default TrendsPage;
