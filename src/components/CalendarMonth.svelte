<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import weekOfYear from "dayjs/plugin/weekOfYear";

  import CalendarDateIndicator from "./CalendarDateIndicator.svelte";
  import CalendarDateSelector from "./CalendarDateSelector.svelte";
  import CalendarWeekdays from "./CalendarWeekdays.svelte";
  import CalendarMonthDayItem from "./CalendarMonthDayItem.svelte";

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  let selectedDate: Dayjs = dayjs();
  let today: string = dayjs().format("YYYY-MM-DD");

  const selectDate = ({ detail: { date } }) => (selectedDate = date);
  const getWeekday = (date) => dayjs(date).weekday();

  $: month = Number(selectedDate.format("M"));
  $: year = Number(selectedDate.format("YYYY"));
  $: numberOfDaysInMonth = dayjs(selectedDate).daysInMonth();
  $: currentMonthDays = [...Array(numberOfDaysInMonth)].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: true,
    };
  });

  let previousMonthDays = [];
  $: {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    previousMonthDays = [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      }
    );
  }

  let nextMonthDays = [];
  $: {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    nextMonthDays = [...Array(visibleNumberOfDaysFromNextMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      }
    );
  }

  $: days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
</script>

<style>
  .calendar-month {
    width: 70%;
    margin: auto;
  }
  .calendar-month-header {
    display: flex;
    padding: 1em;
    background: #1a4b76;
    color: white;
    justify-content: space-between;
  }

  .days-grid {
    display: grid;
    padding: 0.5em 0;
    grid-template-columns: repeat(7, 1fr);
  }
</style>

<div class="calendar-month">
  <div class="calendar-month-header">
    <CalendarDateIndicator {selectedDate} />
    <CalendarDateSelector
      on:newDate={selectDate}
      {selectedDate}
      currentDate={today} />
  </div>
  <CalendarWeekdays />
  <div class="days-grid">
    {#each days as day (day.date)}
      <CalendarMonthDayItem
        day={dayjs(day.date)}
        isCurrentMonth={day.isCurrentMonth}
        isToday={day.date === today} />
    {/each}
  </div>
</div>
