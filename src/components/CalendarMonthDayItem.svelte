<script lang="ts">
  import type { Dayjs } from "dayjs";

  export let day: Dayjs;
  export let isCurrentMonth: boolean = false;
  export let isToday: boolean = false;

  $: label = day.format("D");
</script>

<li
  class="calendar-day"
  class:calendar-day--not-current={!isCurrentMonth}
  class:calendar-day--today={isToday}>
  <span>{label}</span>
</li>
