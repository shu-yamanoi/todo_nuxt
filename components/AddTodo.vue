<template>
  <div class="add-todo">
    <div>
      <input type="text" class="create-todo" placeholder="新しい項目を追加" v-model="newTodo.title" maxlength='20'>
      <div class="error-message">
        {{ titleErrorMsg }}
      </div>
    </div>
    <div>
      <SelectBox ref="selectBox" @select="selectPriority($event)" @open="open($event)" @reselect="reselect($event)" class="select-box" v-model="newTodo.priority" :isSelected="isSelected" :priority="newTodo.priority"  />
      <div v-if="!isOpen && !isSelected" class="error-message">
        {{ priorityErrorMsg }}
      </div>
    </div>
    <div class="create-todo-submit-button" @click="createTodoHandle">
      add
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectBox from './SelectBox.vue'

@Component({

  components: {
    SelectBox
  },

  computed: {
    
  }
})
export default class Home extends Vue {

  titleErrorMsg = ''
  priorityErrorMsg = ''
  newTodo = {
    title: '',
    priority: ''
  }
  isOpen = false;
  isSelected = false;

  $refs!: {
    selectBox: Vue;
  }
  get refs(): any {
    return this.$refs
  }

  createTodoHandle() {
    this.titleErrorMsg = ''
    this.priorityErrorMsg = ''
    if(this.newTodo.title === '') {
      return this.titleErrorMsg = '入力してください'
    }
    if(this.newTodo.priority === '') {
      return this.priorityErrorMsg = '選択してください'
    }
    this.$store.dispatch('add', this.newTodo)
    this.newTodo.title = ''
    this.newTodo.priority = ''
    this.refs.selectBox.clear()
    this.isSelected = false
  }

  selectPriority(event: any) {
    const priority = event.priority as 'HIGH' | 'MEDIUM' | 'LOW'
    this.isOpen = event.isOpen
    this.isSelected = true
    this.newTodo.priority = priority
  }

  open(isOpen: boolean) {
    this.isOpen = isOpen
  }

  reselect(isOpen: boolean) {
    this.isOpen = isOpen
  }
}
</script>
<style scoped>
  .add-todo {
    display: flex;
  }

  .create-todo {
    font-size: 17px;
    height: 25px;
    margin-top: 15px;
    margin-right: 10px;
  }

  .select-box {
    display: flex;
    justify-content: center;
    height: 25px;
    margin-top: 15px;
  }
  .error-message {
    margin: 20px 0px;
  }
  .create-todo-submit-button {
    margin: 15px 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    background-color: lightgreen;
    height: 30px;
    padding: 0px 20px;
    border: 1px solid green;
  }
</style>
