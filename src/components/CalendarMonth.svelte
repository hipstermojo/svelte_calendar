<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import weekOfYear from "dayjs/plugin/weekOfYear";

  import CalendarHeader from "./CalendarHeader.svelte";
  import CalendarWeekdays from "./CalendarWeekdays.svelte";
  import CalendarMonthDayItem from "./CalendarMonthDayItem.svelte";

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  let selectedDate: Dayjs = dayjs();
  let today: string = dayjs().format("YYYY-MM-DD");

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

<div class="calendar-month w-2/3 m-auto">
  <CalendarHeader bind:selectedDate />
  <CalendarWeekdays />
  <div class="days-grid grid grid-cols-7">
    {#each days as day (day.date)}
      <CalendarMonthDayItem
        day={dayjs(day.date)}
        isCurrentMonth={day.isCurrentMonth}
        isToday={day.date === today} />
    {/each}
  </div>
</div>
