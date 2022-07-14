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
        },
        changeTaskName(state, {id, newName}) {
          console.log(id, newName)
          const i = state.tasks.findIndex(task => task.id === id)
          state.tasks[i].name = newName
        },
        changeTaskStatus(state, {status, id}) {
            const i = state.tasks.findIndex(task => task.id === id)
            state.tasks[i].status = status
        },
        deleteTaskById(state, taskId) {
            state.tasks = state.tasks.filter(t => t.id !== taskId)
        },
    },
    actions: {
    },
}