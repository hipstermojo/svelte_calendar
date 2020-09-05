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

<div class="calendar-date-selector">
  <span on:click={selectPrevious}> &lt; </span>
  <span on:click={selectCurrent}>Today</span>
  <span on:click={selectNext}> &gt;</span>
</div>
