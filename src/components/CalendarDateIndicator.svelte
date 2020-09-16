<script lang="ts">
  import type { Dayjs } from "dayjs";

  export let selectedDate: Dayjs;
  $: selectedMonth = selectedDate.format("MMMM YYYY");
</script>

<div class="calendar-date-indicator flex items-center justify-center text-xl">
  {selectedMonth}
</div>
