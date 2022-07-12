<template>
  <div id="app">
    <div class="container">
      <TaskForm/>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/table">Table</router-link>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>

// Custom components
import TaskForm from './components/TaskForm'

export default {
  name: 'App',
  components: {
    TaskForm
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px 0;
}
.container {
  max-width: 1040px;
  margin: 0 auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
