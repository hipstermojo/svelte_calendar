<script lang="ts">
  import Tailwind from "./style/Tailwind.svelte";
  import CalendarMonth from "./components/CalendarMonth.svelte";
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  h1 {
    text-align: center;
  }
</style>

<main class="font-body">
  <Tailwind />
  <h1 class="text-2xl font-bold py-2">Calendar component</h1>
  <CalendarMonth />
</main>
