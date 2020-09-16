<script lang="ts">
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<style>
</style>

<div class="day-of-week grid grid-cols-7">
  {#each WEEKDAYS as weekday}
    <p class="py-1 text-lg font-bold">{weekday}</p>
  {/each}
</div>
