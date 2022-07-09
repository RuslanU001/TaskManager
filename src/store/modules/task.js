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
        setNewStatus(state, value) {
            console.log(value)
        },
        setDoneStatus(state, value) {
            console.log(value)
        },
        changeTaskStatus(state, newTaskOption) {
            let task = state.tasks.find(task => task.id === newTaskOption.id)
            task.status = newTaskOption.status
        }
    },
    actions: {
    },
}