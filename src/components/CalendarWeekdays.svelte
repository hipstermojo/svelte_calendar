<script lang="ts">
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<style>
  .day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .day-of-week > p {
    padding: 0 0.5em;
    font-weight: bold;
  }
</style>

<div class="day-of-week">
  {#each WEEKDAYS as weekday}
    <p>{weekday}</p>
  {/each}
</div>
