<script lang="ts">
  import type { Dayjs } from "dayjs";

  export let day: Dayjs;
  export let isCurrentMonth: boolean = false;
  export let isToday: boolean = false;

  $: label = day.format("D");
</script>

<style>
  .calendar-day:hover {
    background-color: #e2e8f0;
  }
  .calendar-day--not-current {
    background-color: #edf2f7;
    color: #718096;
  }
  .calendar-day--not-current:hover {
    background-color: #cbd5e0;
  }
  .calendar-day--today {
    background: #ffbd2a;
  }
</style>

<div
  class="calendar-day p-1 h-24 border-l-2 border-b-2 border-gray-400"
  class:calendar-day--not-current={!isCurrentMonth}>
  <span
    class="rounded-full px-2 py-1"
    class:calendar-day--today={isToday}>{label}</span>
</div>
