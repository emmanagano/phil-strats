import type { Metadata } from "next";
import { Suspense } from "react";
import { getActivityDays } from "@/data/activity";
import Container from "@/app/components/ui/Container";
import { formatNewsDate } from "@/lib/newsTone";
import ActivityFeed, { Feed } from "./ActivityFeed";

export const metadata: Metadata = {
  title: "What's New",
  description: "The latest destination guides, news, showbiz and sports stories, and books added to Phil Strats, newest first.",
  alternates: { canonical: "/activity" },
};

export default function ActivityPage() {
  const days = getActivityDays();
  return (
    <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="max-w-3xl">
        <p className="eyebrow">Activity</p>
        <h1 className="mt-2 text-4xl font-semibold text-ocean-900 sm:text-5xl">What&apos;s new on Phil Strats</h1>
        <p className="mt-3 text-lg text-muted">Everything we&apos;ve added or updated lately, newest first.</p>
        {days[0] && (
          <p className="mt-2 text-sm text-muted">
            Last updated <time dateTime={days[0].date}>{formatNewsDate(days[0].date)}</time>
          </p>
        )}
        <div className="mt-8">
          <Suspense fallback={<Feed days={days} />}>
            <ActivityFeed days={days} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
