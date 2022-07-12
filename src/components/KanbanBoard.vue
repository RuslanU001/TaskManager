<template>
  <div class="kanban">
    <h1>Kanban board</h1>
    <div class="kanban-list">
      <div :class="'kanban-col ' + kanban.class" v-for="kanban in kanbans" :key="kanban.id">
        <div class="kanban__title kanban-title">{{ kanban.title }}</div>
        <draggable
          class="task-list"
          v-model="kanban.list"
          group="tasks"
          @change="dragTask($event, kanban.status)"
        >
          <div 
          v-for="task in kanban.list" :key="task.id"
          v-tooltip="dateFormating(task.createdAt)"
          class="kanban__item task" 
          >
            <div class="task-name">{{ task.name }}</div>
            <task-dropdown :record="task" />
          </div>
        </draggable>
      </div>
    </div>
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
    kanbans() {
      return [{
        id: 0,
        list: this.allTasks.filter(t => t.status === "new"),
        status: 'new',
        class: 'kanban_new',
        title: 'New'
      }, {
        id: 1,
        list: this.allTasks.filter(t => t.status === "inProgress"),
        status: 'inProgress',
        class: 'kanban_in-progress',
        title: 'In progress'
      }, {
        id: 2,
        list: this.allTasks.filter(t => t.status === "done"),
        status: 'done',
        class: 'kanban_done',
        title: 'Done'
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
    dateFormating(date) {
      return moment(date).format('lll')
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
}
</style>

<style>
.tooltip {
  display: block !important;
  z-index: 100000;
}

.tooltip .tooltip-inner {
  background: rgb(56, 56, 56);
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: rgb(56, 56, 56);
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>