<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import { tab, selectedDate } from "../stores";

  const today = dayjs();
  const renderFormat = {
    day: "dddd D, MMMM YYYY",
    month: "MMMM YYYY",
  };

  const renderShortened = {
    day: "dddd D, MMMM YYYY",
    month: "MMM YYYY",
  };

  const toggleDate = (step: number) =>
    ($selectedDate = $selectedDate.add(step, $tab));

  const toggleToday = () => ($selectedDate = today);

  $: isToday = today.format("YYYY-MM-DD") == $selectedDate.format("YYYY-MM-DD");

  $: renderDate = (monthFormat: string = "MMMM"): string => {
    if ($tab == "week") {
      const weekday: number = $selectedDate.weekday();
      // Refactor into util function
      const mondayThisWeek: Dayjs =
        weekday == 0
          ? $selectedDate.subtract(6, "day")
          : $selectedDate.subtract(weekday - 1, "day");
      const sundayThisWeek: Dayjs = mondayThisWeek.add(6, "day");
      const isSameMonth = mondayThisWeek.month() == sundayThisWeek.month();
      const monthOnMonday = mondayThisWeek.format(monthFormat);
      const monthOnSunday = sundayThisWeek.format(monthFormat);
      return `${monthOnMonday} ${mondayThisWeek.format("DD")} - ${
        isSameMonth ? "" : monthOnSunday
      } ${sundayThisWeek.format("DD")}, ${sundayThisWeek.format("YYYY")}`;
    } else {
      return monthFormat != "MMMM"
        ? $selectedDate.format(renderShortened[$tab])
        : $selectedDate.format(renderFormat[$tab]);
    }
  };
</script>

<style>
  .active {
    @apply text-white;
  }
</style>

<!-- This component displays 2 things:
    - The month currently being rendered
    - Controls to go forward and backward
        - A button specifically to take you back to the current month -->
<div
  class="bg-blue-900 text-white p-4 md:flex md:justify-between md:flex-col
    xl:flex-row">
  <!-- One div contains the month currently being rendered
        as well as controls to go forward and backward-->
  <div class="w-full flex justify-between items-center xl:w-1/2">
    <svg
      on:click={() => toggleDate(-1)}
      class="hidden md:block w-4 h-4 cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
    <p
      class="hidden w-1/2 font-bold tracking-wider sm:block md:w-auto md:text-xl">
      {renderDate()}
    </p>
    <p class="block sm:hidden w-1/2 font-bold tracking-wider">
      {renderDate('MMM')}
    </p>
    <svg
      on:click={() => toggleDate(-1)}
      class="block md:hidden w-4 h-4 cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
    <svg
      on:click={toggleToday}
      class="w-4 h-4 cursor-pointer md:hidden"
      fill="none"
      stroke={isToday ? 'gray' : 'white'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    <svg
      on:click={() => toggleDate(1)}
      class="w-4 h-4 cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  </div>
  <!-- Second div contains the button to take you to the current month -->
  <div
    class="m-0 hidden md:mt-2 md:flex md:w-full md:justify-between xl:m-0
      xl:w-1/3 text-white text-opacity-50">
    <button
      on:click={toggleToday}
      class="px-4 py-1 border-2 rounded-lg border-gray-600 focus:outline-none"
      class:text-white={!isToday}>Today</button>
    <div
      class="flex px-4 py-1 rounded-lg justify-between md:w-2/5 lg:w-64 xl:w-56">
      <p
        class="cursor-pointer hover:text-white"
        class:active={$tab == 'day'}
        on:click={() => ($tab = 'day')}>
        Day
      </p>
      <p
        class="cursor-pointer hover:text-white"
        class:active={$tab == 'week'}
        on:click={() => ($tab = 'week')}>
        Week
      </p>
      <p
        class="cursor-pointer hover:text-white"
        class:active={$tab == 'month'}
        on:click={() => ($tab = 'month')}>
        Month
      </p>
    </div>
  </div>
</div>
