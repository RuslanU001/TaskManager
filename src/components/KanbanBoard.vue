<template>
    <div class="kanban">
        <h1>Kanban board</h1>
        <div class="kanban-list">
            <div class="kanban-col">
                <div class="kanban__title kanban-title">New</div>
                <draggable class="task-list" v-model="newTasks" @change="setNew" group="tasks"> 
                    <div class="kanban__item task" v-for="task in newTasks">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div>
            <div class="kanban-col">
                <div class="kanban__title kanban-title">In progress</div>
                <draggable class="task-list" v-model="inProgressTasks" @change="setInProgress" group="tasks">
                    <div class="kanban__item task" v-for="task in inProgressTasks">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div>
            <div class="kanban-col">
                <div class="kanban__title kanban-title">Done</div>
                <draggable class="task-list" v-model="doneTasks" @change="setDone" group="tasks">
                    <div class="kanban__item task" v-for="task in doneTasks">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div>
        </div>
    
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import draggable from "vuedraggable";

export default {
  data() {
    return {

    }
  },
  components: {
      draggable
  },
  computed: {
    ...mapGetters(['doneTasks', 'inProgressTasks', 'newTasks', 'allTasks']),
  },
  methods: {
    ...mapMutations(['changeTaskStatus']),
    setNew(evt) {
        if(evt.added) {
            let task = {
                id: evt.added.element.id,
                status: "new"
            }
            this.changeTaskStatus(task)
        }
    },
    setInProgress(evt) {
        if(evt.added) {            
            let task = {
                id: evt.added.element.id,
                status: "inProgress"
            }
            this.changeTaskStatus(task)
        }
    },
    setDone(evt) {
        if(evt.added) {            
            let task = {
                id: evt.added.element.id,
                status: "done"
            }
            this.changeTaskStatus(task)
        }
    }
  }
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .kanban {
        max-width: 1040px;
        margin: 0 auto;
    }
    .kanban-list {
        display: flex;
        flex-wrap: wrap;
    }
    .kanban-col {
        flex: 0 0 calc(33.33% - 20px);

        padding: 20px 20px;
        margin: 10px;
        
        border: 1px solid #aaa;
        border-radius: 10px;
    }
    .kanban__title {
        margin-bottom: 10px;
    }
    .kanban-title  {
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
        padding: 10px 20px;
        border: 1px solid #aaa;
        border-radius: 10px;
        background-color: #fff;
    }

</style>
