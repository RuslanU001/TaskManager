<template>
    <div class="table">
        <h1>Task</h1>
        <a-table :dataSource="allTasks" :columns="columns" bordered>    

        </a-table>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Created at",
          dataIndex: "createdAt",
          key: "createdAt",
        },
      ]
    }
  },
  components: {
  },
  computed: mapGetters(['allTasks']),
  
}
</script>

<style scoped>
  .table {
    max-width: 1040px;
    margin: 0 auto;
  }
</style>
