<template>
    <div class="table">
        <h1>Task</h1>
        <a-table :dataSource="allTasks" :columns="columns" bordered>
          <template slot="status" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.id, 'status', $event)" />
          </template>
          <template slot="operation" slot-scope="text, record">
            <task-dropdown :record="record" />
          </template>
        </a-table>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import EditableCell from "./EditableCell"
import TaskDropdown from "./TaskDropdown.vue"
import moment from "moment"

export default {
 data() {
   return {
      columns: [{
        title: "Name",
        dataIndex: "name",
        width: "40%",
      }, {
        title: "Status",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
        width: "30%",
      }, {
        title: "Created at",
        dataIndex: "createdAt",
        customRender: (record) => moment(record.createdAt).format('lll'),
        width: "20%",
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    ...mapMutations(['deleteTaskById', 'changeTaskStatus']),
    onCellChange(id, dataIndex, status) {
      this.changeTaskStatus({status, id})
    },
  },
  components: {
    EditableCell,
    TaskDropdown
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
