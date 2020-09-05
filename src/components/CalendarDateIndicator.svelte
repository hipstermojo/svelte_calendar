<script lang="ts">
  import type { Dayjs } from "dayjs";

  export let selectedDate: Dayjs;
  $: selectedMonth = selectedDate.format("MMMM YYYY");
</script>

<div class="calendar-date-indicator">{selectedMonth}</div>
