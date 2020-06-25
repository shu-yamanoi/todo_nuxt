<template>
  <div>
    <input class="title-form" :value="_value" @blur="inputTitle" maxlength='20'>
    <span class="error-message">{{ errorMsg }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EditTitleForm extends Vue {
  @Prop()
  value!: string

  errorMsg = ''

  _value = ''

  inputTitle(event: any){
    this.errorMsg = ''
    if(event.target.value === '') {
      this._value = ''
      event.target.focus()
      this.errorMsg = '入力してください'
      return 
    }
    this._value = event.target.value
    this.$emit('input', event.target.value)
  }
  
  created() {
    this._value = this.value
  }
}
</script>
<style scoped>
  .title-form {
    border: 1px solid transparent;
    font-size: 20px;
    height: 25px;
    width: 150px;
  }
  
  .error-message {
    height: 10px;
    font-size: 15px;
    color: red;
  }
</style>
