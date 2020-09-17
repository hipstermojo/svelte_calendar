import dayjs from "dayjs";
import { Writable, writable, readable, Readable } from "svelte/store";
type TabVal = "month" | "week" | "day";
export const tab: Writable<TabVal> = writable("month");
export const today: Readable<string> = readable(
  dayjs().format("YYYY-MM-DD"),
  function start() {
    return function stop() {};
  }
);
