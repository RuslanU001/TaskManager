export default {
    state: {
        tasks: [],
        nextId: 0,
    },
    getters: {
        allTasks(state) {
            return state.tasks
        },
        availableId(state) {
            return state.nextId
        },
    },
    mutations: {
        createTask(state, newTask) {
            state.tasks.unshift(newTask)
        },
        idIncrement(state) {
            state.nextId++
        }
    },
    actions: {
    },
}