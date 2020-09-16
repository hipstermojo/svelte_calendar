<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import dayjs, { Dayjs } from "dayjs";

  const dispatch = createEventDispatcher();

  export let currentDate: string;
  export let selectedDate: Dayjs;

  const selectPrevious = () => {
    selectedDate = dayjs(selectedDate).subtract(1, "month");
    dispatch("newDate", { date: selectedDate });
  };
  const selectCurrent = () => {
    selectedDate = dayjs(currentDate);
    dispatch("newDate", { date: selectedDate });
  };
  const selectNext = () => {
    selectedDate = dayjs(selectedDate).add(1, "month");
    dispatch("newDate", { date: selectedDate });
  };
</script>

<div class="calendar-date-selector flex justify-center items-center">
  <span on:click={selectPrevious} class="p-2 cursor-pointer">
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M15 19l-7-7 7-7" /></svg>
  </span>
  <span on:click={selectCurrent} class="text-xl cursor-pointer">Today</span>
  <span on:click={selectNext} class="p-2 cursor-pointer">
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M9 5l7 7-7 7" /></svg></span>
</div>
