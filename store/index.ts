import { Todo } from './types'
import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const dbTodos = db.collection('todo')
const dbIdDoc = db.collection('id').doc('oVtAq91zXCuBNictAUDy')

export const state = () => ({
    todos: [] as Todo[],
    id: 1
})

export const mutations = {
  addTodo(state, newTodo) {
    const todo: Todo = {
      title: newTodo.title,
      id: state.id,
      priority: newTodo.priority,
      status: 'TODO'
    }
    state.todos.push(todo)
    dbTodos.add(todo)
    console.log(state.id)
    state.id++
    dbIdDoc.set({id: state.id})
    console.log(state.id)
  },

  changeStatus(state, todo) {
    for(let i = 0; i < state.todos.length; i++) {
      if(state.todos[i].id === todo.id) {
        state.todos[i].status = todo.status === 'TODO' 
          ? 'DOING'
          : 'DONE'
        state.todos.splice(i, 1, state.todos[i])
        break
      }
    }
    dbTodos.where('id', '==', todo.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(todo.status === 'TODO') {
          doc.ref.update({
            status: 'DOING'
          })
        }else {
          doc.ref.update({
            status: 'DONE'
          })
        }
      })
    })
    .catch(function(err) {
      console.log('error: ' + err)
    })
  },

  deleteTodo(state, todo) {
    const targetIndex: number = state.todos.findIndex(_todo => _todo.id === todo.id)
    dbTodos.where('id', '==', todo.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete()
      })
    })
    .catch(function(err) {
      console.log('error: ' + err)
    })
    state.todos.splice(targetIndex, 1)
  },

  updataTodo(state, todo) {
    const targetTodo: Todo | undefined = state.todos.find(_todo => _todo.id === todo.id)
    if(targetTodo) {
      if(todo.title) {
        targetTodo.title = todo.title
        dbTodos.where('id', '==', todo.id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              title: todo.title
            })
          })
        })
        .catch(function(err) {
          console.log('error: ' + err)
        })
      }else if(todo.priority) {
        targetTodo.priority = todo.priority
        dbTodos.where('id', '==', todo.id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              priority: todo.priority
            })
          })
        })
        .catch(function(err) {
          console.log('error: ' + err)
        })
      }
    }
  },

  setTodo(state, todo) {
    const setTodo: Todo = {
      title: todo.title,
      id: state.id,
      priority: todo.priority,
      status: 'TODO'
    }
    state.todos.push(todo)
  },

  setId(state, id) {
    state.id = id
  }
}

export const actions = {
  add({ commit }, newTodo) {
    commit('addTodo', newTodo)
  },

  toNextStatus({ commit }, todo) {
    commit('changeStatus', todo)
  },

  delete({ commit }, todo) {
    commit('deleteTodo', todo)
  },

  update({ commit }, todo) {
    commit('updataTodo', todo)
  },

  fetchTodos({ commit }) {
    dbTodos
    .get()
    .then(res => {
      res.forEach(doc => {
        commit('setTodo', doc.data())
      })
    })
    .catch(function(err) {
      console.log('error: ' + err)
    })
  },

  fetchId({ commit }) {
    dbIdDoc.get()
    .then(res => {
        if('id' in res) {
          commit('setId', res?.data()?.id)
        }else {
          console.log("not found id")
        }
    })
    .catch(function(err) {
      console.log('error: ' + err)
    })
  }
}

