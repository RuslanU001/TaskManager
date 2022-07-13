<template>
  <form @submit.prevent="submit">
    <a-input v-model="name" placeholder="Название" class="input" />
    <a-select v-model="status" class="select">
      <a-select-option v-for="status in statuses" :value="status">{{ translate[status] }}</a-select-option>
    </a-select>
    <a-button @click="submit">Добавить задачу</a-button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  data() {
    return {
      name: '',
      status: 'new',
      statuses: ['new', 'inProgress', 'done'],
      translate: {
        'new': 'Новое',
        'inProgress': 'В работе',
        'done': 'Готово'
      }
    }
  },
  computed: mapGetters(['availableId']),
  methods: {
    ...mapMutations(['createTask', 'idIncrement']),
    submit() {
      if (this.name && this.status) {
        this.createTask({
          id: this.availableId,
          name: this.name,
          status: this.status,
          createdAt: Date.now()
        })
        this.idIncrement()
      }
      this.name = ''
    }
  },
}
</script>

<style scoped>
form {
  max-width: 300px;
  padding: 20px 20px;
  margin: 0 auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
.input {
  display: block;
  margin-bottom: 10px;
}
.select {
  display: block;
  margin-bottom: 20px;
}
</style>
