<template>
  <div class="home">
    <!-- <h1>Comming soon...</h1> -->
    <KanbanBoard/>
  </div>
</template>

<script>
// @ is an alias to /src
import KanbanBoard from '@/components/KanbanBoard.vue'

export default {
  name: 'HomeView',
  components: {
    KanbanBoard
  }
}
</script>
