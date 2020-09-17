<script lang="ts">
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<style>
</style>

<div class="day-of-week h-12 grid grid-cols-7">
  {#each WEEKDAYS as weekday}
    <div class="h-full w-full inline-flex items-center justify-center">
      <p class="text-sm md:text-lg font-bold">{weekday}</p>
    </div>
  {/each}
</div>
