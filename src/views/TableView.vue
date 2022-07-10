<template>
  <div class="table">
    <!-- <h1>Task table</h1> -->
    <TaskTable/>
  </div>
</template>

<script>

import TaskTable from '@/components/TaskTable.vue'

export default {
  name: 'TableView',
  components: {
    TaskTable
  }
}
</script>