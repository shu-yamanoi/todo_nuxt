<template>
  <div>
    <div class="todo-header">
      {{ todoHeader }}
    </div>
    <ul>
      <li v-for="todoItem in todoItems" :key="todoItem.id">
        <div class="todo-table">
          <div class="todo-delete-button" @click="deleteTodoHandle(todoItem)">
            ×
          </div>
          <div class="todo-title">
            <editTitleForm :value="todoItem.title" @input="updateTitle($event, todoItem.id)" />
          </div>
          <div class="priority-select">
            <SelectBox :priority="todoItem.priority" :isSelected=true @reselect="reselect($event)" @select="select($event, todoItem.id)" />
          </div>
          <div v-if="!isOpen && todoItem.status !== 'DONE'" class="to-next" @click="toNextStatusHandle(todoItem.status, todoItem.id)">
            →
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import{ Component, Vue, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import AddTodo from './AddTodo.vue'
import { Todo } from '../store/types'
import EditTitleForm from './EditTitleForm.vue'
import SelectBox from './SelectBox.vue'

@Component({

  components: {
    AddTodo,
    EditTitleForm,
    SelectBox
  },
  
  computed: {
    ...mapState(['todos'])
  }
})
export default class TodoList extends Vue {
  @Prop()
  status!: 'TODO' | 'DOING' | 'DONE'

  isOpen = false


  toNextStatusHandle(status: 'TODO' | 'DOING', id: number) {
    this.$store.dispatch('toNextStatus', {
      status,
      id
    })
  }

  deleteTodoHandle(todoItem: Todo) {
    this.$store.dispatch('delete', todoItem)
  }

  updateTitle(title: string, id: number) {
    this.$store.dispatch('update', {
      title,
      id
    })
  }

  priorityClass(priority: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    switch(priority) {
      case 'HIGH':
        return 'highPriority'
      case 'MEDIUM':
        return 'mediumPriority'
      case 'LOW':
        return'lowPriority'
    }
  }

  reselect(isOpen: boolean) {
    this.isOpen = isOpen
  }

  select(event: any, id: number) {
    this.$store.dispatch('update', {
      id,
      priority: event.priority
    })
    this.isOpen = event.isOpen
  }

  get todoHeader() {
    switch (this.status) {
      case('DOING'):
        return 'doing'
      case('DONE'):
        return 'done'
      default:
        return 'to do'
    }
  }

  get todoItems() {
    return this.$store.state.todos.filter((todo: Todo) => todo.status === this.status) 
  }

}
</script>
<style scoped>
  .todo-header {
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 40px;
    padding: 0px, 20px;
  }

  ul {
    display: list-item;
    list-style-type: none;
  }

  .error-message {
    color: red;
  }

  .todo-table {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 40px;
  }

  .to-next {
    float: right;
    margin-bottom: 30px;
    margin-left: auto;
    color: green;
    font-size: 25px;
    cursor: pointer;
  }

  li {
    margin-bottom: 10px;
  }

  .todo-title {
    font-size: 25px;
  }

  .todo-delete-button {
    font-size: 25px;
    color:red;
    margin-right: 10px;
    cursor: pointer;
  }

  .priority-select {
    height: 40px;
  }
  
</style>
