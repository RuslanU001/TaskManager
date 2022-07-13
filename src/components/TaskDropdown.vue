<template>
  <div>
    <a-dropdown>
      <a-menu :record="record" slot="overlay" @click="handleMenuClick($event, record)">
        <a-menu-item v-if="record.status !== 'new'" key="new">Новое</a-menu-item>
        <a-menu-item v-if="record.status !== 'inProgress'" key="inProgress">В работе</a-menu-item>
        <a-menu-item v-if="record.status !== 'done'" key="done">Готово</a-menu-item>
        <a-menu-item key="delete">Удалить</a-menu-item>
      </a-menu>
      <a-button>
        <a-icon type="bars" />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  props: {
    record: Object,
  },
  methods: {
    ...mapMutations(['deleteTaskById', 'changeTaskStatus']),

    handleMenuClick(event, task) {
      switch (event.key) {
        case 'new':
          this.changeTaskStatus({ status: 'new', id: task.id })
          break
        case 'inProgress':
          this.changeTaskStatus({ status: 'inProgress', id: task.id })
          break
        case 'done':
          this.changeTaskStatus({ status: 'done', id: task.id })
          break
        case 'delete':
          this.deleteTaskById(task.id)
          break
      }
    }
  },
}
</script>