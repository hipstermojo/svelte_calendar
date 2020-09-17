<script lang="ts">
  import { today } from "../stores";
  import dayjs, { Dayjs } from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  dayjs.extend(weekday);

  const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  export let selectedDate: Dayjs;

  let dates: Dayjs[] = Array(7);
  $: {
    const selectedWeekday: number = selectedDate.weekday();
    const mondayThisWeek =
      selectedWeekday == 1
        ? selectedDate
        : selectedDate.subtract(7 - selectedWeekday, "day");
    dates = dates.fill(null).map((_, i) => mondayThisWeek.add(i, "day"));
  }
</script>

<style>
  .parent {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
  }
  .today {
    @apply text-blue-700;
  }
</style>

<div>
  <div class="flex h-24">
    <!-- Refactor this to be usable from CalendarWeekdays -->
    <div style="width: 60px" class="flex justify-center items-center">
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
    {#each WEEKDAYS as day, i}
      <div
        class="flex-1 flex flex-col justify-center bg-gray-400 h-full"
        class:today={dates[i].format('YYYY-MM-DD') == $today}>
        <p class="text-center text-2xl font-bold">{dates[i].format('DD')}</p>
        <p class="text-center uppercase">{day}</p>
      </div>
    {/each}
  </div>
  <div class="parent grid h-102 border-r-2 border-gray-400 overflow-y-scroll">
    {#each { length: 24 * 8 } as _, i}
      {#if i % 8 == 0}
        <div class="border-gray-400 h-20">
          <p class="sticky top-0 p-1 text-gray-600">
            {Math.ceil(i / 8)
              .toString()
              .padStart(2, '0')}:00
          </p>
        </div>
      {:else}
        <div class="border-l-2 border-b-2 border-gray-400 h-20" />
      {/if}
    {/each}
  </div>
</div>
