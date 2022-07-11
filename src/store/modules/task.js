export default {
    state: {
        tasks: [],
        nextId: 0,
    },
    getters: {
        newTasks(state) {
            return state.tasks.filter(t => t.status === "new")
        },
        inProgressTasks(state) {
            return state.tasks.filter(t => t.status === "inProgress")
        },
        doneTasks(state) {
            return state.tasks.filter(t => t.status === "done")
        },
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
        changeTaskStatus(state, {status, id}) {
            let task = state.tasks.find(task => task.id === id)
            task.status = status
        },
        deleteTaskById(state, taskId) {
            state.tasks = state.tasks.filter(t => t.id !== taskId)
        }
    },
    actions: {
    },
}