<template>
    <div class="table">
        <h1>Task</h1>
        <a-table :dataSource="allTasks" :columns="columns" bordered>   
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="allTasks.length"
              title="Sure to delete?"
              @confirm="() => onDelete(record.id)"
            >
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </template>
        </a-table>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
 data() {
   return {
     columns: [{
        title: "Name",
        dataIndex: "name",
      }, {
        title: "Status",
        dataIndex: "status",
      }, {
        title: "Created at",
        dataIndex: "createdAt",
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }]

    }
  },
  methods: {
    ...mapMutations(['deleteTaskById']),
    onDelete(id) {
      this.deleteTaskById(id)
    },
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
