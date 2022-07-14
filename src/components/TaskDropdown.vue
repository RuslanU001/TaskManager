<template>
  <div>
    <a-dropdown>
      <a-menu :record="task" slot="overlay" @click="handleMenuClick($event, task)">
        <a-menu-item v-if="task.status !== 'new'" key="new">Новое</a-menu-item>
        <a-menu-item v-if="task.status !== 'inProgress'" key="inProgress">В работе</a-menu-item>
        <a-menu-item v-if="task.status !== 'done'" key="done">Готово</a-menu-item>
        <a-menu-item key="delete">Удалить</a-menu-item>
        <a-menu-item key="change">Изменить</a-menu-item>
      </a-menu>
      <a-button>
        <a-icon type="bars" />
      </a-button>
    </a-dropdown>
    <a-modal :visible="visible" title="Измение задачи" 
      @ok="handleOk"
      okText="Применить"
      @cancel="handleCancel"
      cancelText="Отменить"  
    >
      <a-input v-model:value="newName" placeholder="Название" class="input" />
    </a-modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  props: {
    record: Object,
  },
  data() {
    return {
      visible: false,
      task: this.record,
      newName: this.record.name,
    }

  },
  methods: {
    ...mapMutations(['deleteTaskById', 'changeTaskStatus', 'changeTaskName']),
    handleOk(evt) {
      if (this.newName !== this.task.name) {
        this.changeTaskName({ id: this.task.id, newName: this.newName })
      }
      this.visible = false

    },
    handleCancel() {
      this.newName = this.task.name
      this.visible = false
    },
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
        case 'change':
          this.visible = true
          break
      }
    }
  },
}
</script>