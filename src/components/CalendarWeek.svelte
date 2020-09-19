<script lang="ts">
  import { today, selectedDate } from "../stores";
  import type { Dayjs } from "dayjs";

  const isToday = (date: Dayjs) => date.format("YYYY-MM-DD") == $today;
  const isSelected = (date: Dayjs) =>
    date.format("YYYY-MM-DD") == $selectedDate.format("YYYY-MM-DD");

  let dates: Dayjs[] = Array(7);
  $: {
    const selectedWeekday: number = $selectedDate.weekday();
    const mondayThisWeek =
      selectedWeekday == 0
        ? $selectedDate.subtract(6, "day") // if the weekday is a Sunday, go back to the previous Monday
        : $selectedDate.subtract(selectedWeekday - 1, "day");
    dates = dates.fill(null).map((_, i) => mondayThisWeek.add(i, "day"));
  }
</script>

<style>
  .parent {
    display: grid;
    grid-template-columns: 2.5rem repeat(7, 1fr);
  }
  @screen md {
    .parent {
      display: grid;
      grid-template-columns: 3rem repeat(7, 1fr);
    }
  }
</style>

<div>
  <div class="flex h-16 md:h-24">
    <!-- Refactor this to be usable from CalendarWeekdays -->
    <div class="w-12 hidden md:flex justify-center items-center">
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
    {#each dates as date (date.format('YYYY-MM-DD'))}
      <div
        on:click={() => ($selectedDate = date)}
        class="flex-1 flex flex-col justify-center h-full cursor-pointer"
        class:text-blue-600={isSelected(date)}
        class:text-bright-yellow={isToday(date)}>
        <p class="text-center md:text-2xl font-bold">{date.format('DD')}</p>
        <p class="text-center md:uppercase">{date.format('dddd')}</p>
      </div>
    {/each}
  </div>
  <div class="parent grid h-102 border-gray-400 overflow-y-scroll">
    <!-- Extract this into a timeline component -->
    {#each { length: 24 * 8 } as _, i}
      {#if i % 8 == 0}
        <div class="h-20 border-b-2 border-gray-400 md:border-none">
          <p class="sticky top-0 text-gray-600 text-xs md:pt-1 md:text-base">
            {Math.ceil(i / 8)
              .toString()
              .padStart(2, '0')}:00
          </p>
        </div>
      {:else}
        <div class="border-b-2 border-gray-400 h-20" />
      {/if}
    {/each}
  </div>
</div>
