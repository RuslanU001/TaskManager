<template>
    <div class="kanban">
        <h1>Kanban board</h1>
        <div class="kanban-list">

            <!-- TRY ON -->

            <!-- <div class="kanban-col" v-for="kanban in kanbans" :key="kanban.id">
                <div class="kanban__title kanban-title">{{ kanban.title }}</div>
                <draggable class="task-list" v-model="kanban.list" group="tasks"> 
                    <div class="kanban__item task" v-for="task in kanban.list" :key="task.id">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div> -->

            <!-- TRY OFF -->
            <div class="kanban-col">
                <div class="kanban__title kanban-title">New</div>
                <draggable class="task-list" v-model="newTasks" group="tasks"> 
                    <div class="kanban__item task" v-for="task in newTasks">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div>
            <div class="kanban-col">
                <div class="kanban__title kanban-title">In Progress</div>
                <draggable class="task-list" v-model="inProgressTasks" group="tasks">
                    <div class="kanban__item task" v-for="task in inProgressTasks">
                        <div class="task-name">{{ task.name }}</div>
                    </div>
                </draggable>
            </div>
            <div class="kanban-col">
                <div class="kanban__title kanban-title">Done</div>
                <draggable class="task-list" v-model="doneTasks" group="tasks">
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
    ...mapGetters(['allTasks']),

    doneTasks: {
        get() {
            return this.allTasks.filter(t => t.status === "done")
        },
        set(changedList) {
            this.statusSetter(changedList, 'done')
        }
    },
    inProgressTasks: {
        get() {
            return this.allTasks.filter(t => t.status === "inProgress")
        },
        set(changedList) {
            this.statusSetter(changedList, 'inProgress')
        }
    },
    newTasks: {
        get() {
            return this.allTasks.filter(t => t.status === "new")
        },
        set(changedList) {
            this.statusSetter(changedList, 'new')
        }
    },
    kanbans() { 
        return [{
            id: 0,
            list: this.newTasks,
            title: 'New'
        }, {
            id: 1,
            list: this.inProgressTasks,
            title: 'In progress'
        }, {
            id: 2,
            list: this.doneTasks,
            title: 'Done'
        },
    ]},

  },
  methods: {
    ...mapMutations(['changeTaskStatus']),

    statusSetter(changedList, status) {
        const task = changedList.find(t => t.status !== status)
        if(task) {
            const id = task.id
            this.changeTaskStatus({status, id})
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
