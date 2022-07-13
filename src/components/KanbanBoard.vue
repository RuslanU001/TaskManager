<template>
  <div class="kanban">
    <h1>Канбан-доска</h1>

    <div v-if="hasData" class="kanban-list">
      <div :class="'kanban-col ' + kanban.class" v-for="kanban in kanbans" :key="kanban.id">
        <div class="kanban__title kanban-title">{{ kanban.title }}</div>
        <draggable
          class="task-list"
          v-model="kanban.list"
          group="tasks"
          @change="dragTask($event, kanban.status)"
        >
          <a-tooltip v-for="task in kanban.list" :key="task.id" class="kanban__item task">
            <template slot="title">{{ moment(task.createdAt) }}</template>
            <div class="task-name">{{ task.name }}</div>
            <task-dropdown :record="task" />
          </a-tooltip>
        </draggable>
      </div>
    </div>
    <div v-else>Данных нет</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import draggable from "vuedraggable"
import moment from "moment"
import TaskDropdown from "./TaskDropdown.vue"

export default {
  components: {
    draggable,
    TaskDropdown
  },
  computed: {
    ...mapGetters(['allTasks']),
    hasData() {
      return this.allTasks.length
    },
    kanbans() {
      return [{
        id: 0,
        list: this.allTasks.filter(t => t.status === "new"),
        status: 'new',
        class: 'kanban_new',
        title: 'Новое'
      }, {
        id: 1,
        list: this.allTasks.filter(t => t.status === "inProgress"),
        status: 'inProgress',
        class: 'kanban_in-progress',
        title: 'В работе'
      }, {
        id: 2,
        list: this.allTasks.filter(t => t.status === "done"),
        status: 'done',
        class: 'kanban_done',
        title: 'Готово'
      },
      ]
    },
  },
  methods: {
    ...mapMutations(['changeTaskStatus']),
    dragTask(task, status) {
      if (task.added) {
        this.changeTaskStatus({ status, id: task.added.element.id });
      }
    },
    moment(date) {
      const displayDate = moment(date)
      const deltaDate = displayDate.clone().add(12, 'hour')
      if (deltaDate > Date.now())
        return displayDate.fromNow()
      return displayDate.format('lll')
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.kanban-list {
  display: flex;
  flex-wrap: wrap;
}
.kanban-col {
  flex: 0 0 calc(33.33% - 20px);

  padding: 20px 20px;
  margin: 10px;

  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
.kanban_new {
  background-color: rgb(242, 255, 214);
}
.kanban_in-progress {
  background-color: rgb(255, 251, 212);
}
.kanban_done {
  background-color: rgb(230, 248, 255);
}
.kanban__title {
  margin-bottom: 10px;
}
.kanban-title {
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 800;
}
.kanban__item {
  margin-bottom: 10px;
}
.task-list {
  min-height: 200px;
}
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  background-color: #fff;
  cursor: move;
}
</style>