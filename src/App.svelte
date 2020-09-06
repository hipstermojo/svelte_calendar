<script lang="ts">
  import CalendarMonth from "./components/CalendarMonth.svelte";
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
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

<main>
  <h1>Calendar component</h1>
  <CalendarMonth />
</main>
