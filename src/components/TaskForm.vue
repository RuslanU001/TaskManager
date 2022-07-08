<template>
  <form @submit.prevent="submit">
      <input type="text" placeholder="Name" v-model="name">
      <select name="status" id="status" v-model="status">
          <option value="" selected disabled>Status</option>
          <option value="new" >New</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
      </select>
      <button type="submit">Add task</button>
    </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  data() {
    return {
      name: '',
      status: '',
    }
  },
  computed: {
    ...mapGetters(['availableId'])
  },
  methods: {
    ...mapMutations(['createTask', 'idIncrement']),

    submit() {
      // save entry if fields isn't empty 
      if(this.name && this.status) {
        this.createTask({
          id: this.availableId,
          name: this.name,
          status: this.status,
          createdAt: Date.now()
        })
        this.idIncrement()
      }
      // reset fields data
      this.name = ''
      this.status = ''
    }
  },
}
</script>

<style scoped>

</style>
