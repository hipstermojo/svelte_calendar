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
  .calendar-day--today:hover {
    background: #f5a700;
  }
</style>

<div
  class="calendar-day p-1 h-24"
  class:calendar-day--not-current={!isCurrentMonth}
  class:calendar-day--today={isToday}>
  <span>{label}</span>
</div>
