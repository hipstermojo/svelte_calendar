<script lang="ts">
  import type { Dayjs } from "dayjs";
  import { today, selectedDate } from "../stores";

  export let day: Dayjs;
  export let isCurrentMonth: boolean = false;

  const isToday: boolean = day.format("YYYY-MM-DD") == $today;

  $: isSelected =
    day.format("YYYY-MM-DD") == $selectedDate.format("YYYY-MM-DD");

  $: label = day.format("D");
</script>

<style>
  .calendar-day:hover {
    @apply bg-gray-400;
  }
  .calendar-day--not-current {
    @apply text-gray-600;
  }

  .calendar-day--not-current:hover {
    background-color: #cbd5e0;
  }
  .calendar-day--today {
    @apply bg-bright-yellow;
  }
  .calendar-day--today:hover {
    @apply bg-yellow-600;
  }

  @screen md {
    .calendar-day--not-current {
      @apply bg-gray-300;
    }
    .calendar-day--today {
      @apply bg-white;
    }
    .calendar-day--today > p {
      @apply bg-bright-yellow;
    }
    .calendar-day--today:hover {
      @apply bg-gray-400;
    }
  }
</style>

<div
  class="calendar-day h-8 w-8 m-1 flex justify-center items-center
    border-gray-400 rounded-full md:h-24 md:w-full md:m-0 md:block md:p-1
    md:rounded-none md:hover:bg-gray-400 md:border-l-2 md:border-b-2"
  class:calendar-day--today={isToday}
  class:calendar-day--not-current={!isCurrentMonth}
  class:bg-gray-400={isSelected}
  on:click={() => ($selectedDate = day)}>
  <p
    class="text-sm px-2 py-1 md:text-base md:rounded-full md:inline-block"
    class:text-white={isSelected && !isToday}>
    {label}
  </p>
</div>
