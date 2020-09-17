<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  export let selectedDate: Dayjs;

  const today = dayjs();
  const toggleMonth = (step: number) =>
    (selectedDate = selectedDate.add(step, "month"));

  const toggleToday = () => (selectedDate = today);

  $: selectedMonth = selectedDate.format("MMMM YYYY");
</script>

<style>
</style>

<!-- This component displays 2 things:
    - The month currently being rendered
    - Controls to go forward and backward
        - A button specifically to take you back to the current month -->
<div class="bg-blue-900 text-white p-4 md:flex md:justify-between">
  <!-- One div contains the month currently being rendered
        as well as controls to go forward and backward-->
  <div class="w-full md:w-64 flex justify-between items-center">
    <svg
      on:click={() => toggleMonth(-1)}
      class="hidden md:block w-4 h-4 cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
    <p class="w-1/2 font-bold tracking-wider md:w-auto md:text-xl">
      {selectedMonth}
    </p>
    <svg
      on:click={() => toggleMonth(-1)}
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
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    <svg
      on:click={() => toggleMonth(1)}
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
  <div class="hidden md:w-1/3 md:flex md:justify-between">
    <button
      on:click={toggleToday}
      class="px-4 py-1 border-2 rounded-lg border-gray-600 focus:outline-none">Today</button>
    <div
      class="flex w-56 px-4 py-1 border-2 rounded-lg border-gray-600
        justify-between">
      <p>Day</p>
      <p>Week</p>
      <p>Month</p>
    </div>
  </div>
</div>
