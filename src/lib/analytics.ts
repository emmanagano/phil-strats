// GA4 events for the interactive guide. gtag is loaded in layout.tsx; if it's blocked or not
// loaded yet, events are dropped silently. No personal data is sent: only the guide slug,
// which control was used, and a short value (a month, a tab name, an item name).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type GuideControl =
  | "month"
  | "route_tab"
  | "flight_search"
  | "budget_style"
  | "nights"
  | "travelers"
  | "itinerary_days"
  | "filter"
  | "save"
  | "unsave"
  | "pack"
  | "copy_plan"
  | "nav";

const timers = new Map<string, ReturnType<typeof setTimeout>>();

// Sends one `guide_interaction` event. Controls that fire continuously (a slider, steppers)
// pass `debounce` so only the final value is sent.
export function trackGuide(guide: string, control: GuideControl, value?: string | number, debounce = 0) {
  const send = () => {
    try {
      window.gtag?.("event", "guide_interaction", {
        guide,
        control,
        value: value === undefined ? "" : String(value).slice(0, 100),
      });
    } catch {
      /* analytics must never break the page */
    }
  };
  if (!debounce) return send();
  const key = `${guide}:${control}`;
  clearTimeout(timers.get(key));
  timers.set(key, setTimeout(send, debounce));
}
