<script lang="ts">
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<ol class="day-of-week">
  {#each WEEKDAYS as weekday}{weekday}{/each}
</ol>
