<template>
  <div class="calendarBlock">
    <div class="caption">Calendar</div>
    <VCalendar :color="selectedColor" :attributes="attrs" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedColor = ref('blue');

const today = new Date().toISOString().slice(0, 10);

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: today,
  },
]);
</script>

<script>
export default {
  name: 'Calendar',
};
</script>

<style lang="scss" scoped>
.calendarBlock {
  display: flex;
  flex-direction: column;
  margin-left: 400px;
  margin-top: 100px;
}

.caption {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>
