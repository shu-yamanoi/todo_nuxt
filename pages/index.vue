<template>
  <div class="home">
    <AddTodo />
    <div class="todo-table">
      <div v-for="(status, index) in statuses" :key="index" class="todo-list">
        <TodoList :status="status" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoList from '~/components/TodoList.vue'
import AddTodo from '~/components/AddTodo.vue'

@Component({

components: {
  TodoList,
  AddTodo
},
})
export default class Home extends Vue {
statuses = ['TODO', 'DOING', 'DONE']

created() {
    this.$store.dispatch('fetchTodos')
    this.$store.dispatch('fetchId')
  }
}

</script>
<style scoped>

  .home {
    margin-right: 50px;
    height: 100%;
  }

  .todo-table {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0px 0px;
    height: 100vh;
    padding: 0px, 20px;
    width: 100%;
  }

  .add-todo {
    margin: 20px 0 60px;
  }

  .todo-list {
    width: 30%;
  }
</style>
