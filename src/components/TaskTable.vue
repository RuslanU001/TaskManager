<template>
  <div class="table">
    <h1>Таблица задач</h1>
    <a-table v-if="hasData" rowKey="id" :dataSource="allTasks" :columns="columns" bordered>
      <template slot="status" slot-scope="text, record">
        <editable-cell :text="text" @change="changeTaskStatus({ status: $event, id: record.id })" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <task-dropdown :record="record" />
      </template>
    </a-table>
    <div v-else>Данных нет</div>
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
        key: "name",
        title: "Имя",
        dataIndex: "name",
        width: "40%",
      }, {
        key: "status",
        title: "Статус",
        dataIndex: "status",
        scopedSlots: { customRender: 'status' },
        width: "30%",
      }, {
        key: "createdAt",
        title: "Дата создания",
        dataIndex: "createdAt",
        customRender: (record) => moment(record.createdAt).format('lll'),
        width: "20%",
      }, {
        key: "opearion",
        title: 'Действия',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  components: {
    EditableCell,
    TaskDropdown
  },
  computed: {
    ...mapGetters(['allTasks']),
    hasData() {
      return this.allTasks.length
    },
  },
  methods: mapMutations(['deleteTaskById', 'changeTaskStatus']),
}
</script>

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
