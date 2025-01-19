import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCard = () => (
  <Card className="w-full p-6 space-y-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>

    <div className="space-y-4">
      <Skeleton className="h-52 w-full rounded-xl" />
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center space-y-1">
            <Skeleton className="h-3 w-16 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const ActivityCard = () => (
  <Card className="w-full p-6 space-y-4">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>

    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  </Card>
);

const StatsGrid = () => (
  <div className="grid grid-cols-2 gap-4">
    {[...Array(2)].map((_, i) => (
      <Card key={i} className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-2 w-full" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </Card>
    ))}
  </div>
);

const Loading = () => {
  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <ProfileCard />
            <StatsGrid />
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <ActivityCard />
            <ActivityCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;