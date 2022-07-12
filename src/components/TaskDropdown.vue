
<template>
    <div>
        <!-- {{record}} -->
        <a-dropdown >
            <a-menu :record="record" slot="overlay" @click="handleMenuClick($event, record)">
            <a-menu-item key="new">To new</a-menu-item>
            <a-menu-item key="inProgress">To in progress</a-menu-item>
            <a-menu-item key="done">To done</a-menu-item>
            <a-menu-item key="delete">Delete</a-menu-item>
            </a-menu>
            <a-button><a-icon type="bars" /></a-button>
        </a-dropdown>        
    </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
    
    props: {
        record: Object,
    },
    data() {
        return {}
    },
    methods: {
        ...mapMutations(['deleteTaskById', 'changeTaskStatus']),

        handleMenuClick(event, task) {
            switch(event.key) {
                case 'new':
                    this.changeTaskStatus({status: 'new', id: task.id})
                break
                case 'inProgress':
                    this.changeTaskStatus({status: 'inProgress', id: task.id})
                break
                    case 'done':
                    this.changeTaskStatus({status: 'done', id: task.id})
                break
                case 'delete':
                    this.deleteTaskById(task.id)
                break
                default: 
                break
            }
        }
    },
}
</script>