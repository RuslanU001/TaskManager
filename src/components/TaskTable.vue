<template>
    <div class="table">
        <h1>Task</h1>
        <a-table :dataSource="allTasks" :columns="columns" bordered>
          <template slot="status" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.id, 'status', $event)" />
          </template>
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

import EditableCell from "./EditableCell"

export default {
 data() {
   return {
      columns: [{
        title: "Name",
        dataIndex: "name",
      }, {
        title: "Status",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
      }, {
        title: "Created at",
        dataIndex: "createdAt",
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    ...mapMutations(['deleteTaskById', 'changeTaskStatus']),
    onDelete(id) {
      this.deleteTaskById(id)
    },
    onCellChange(id, dataIndex, status) {
      this.changeTaskStatus({status, id})
    },
  },
  components: {
    EditableCell
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
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }

</style>
