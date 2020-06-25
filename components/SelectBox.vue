<template>
  <div class="select-box">
    <div v-if="!isOpen && !isSelected" class="drop-down-button" @click="open">
      優先度を選択
    </div>
    <div v-else-if="!isOpen && nowIsSelected" :class="priorityClass(priority)" @click="reselect">
      {{ nowPriority }}
    </div>
    <ul v-else-if="isOpen && !nowIsSelected" class="drop-down-items">
        <li @click="select('HIGH')">HIGH</li>
        <li @click="select('MEDIUM')">MEDIUM</li>
        <li @click="select('LOW')">LOW</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {
  @Prop()
  priority!: 'HIGH' | 'MEDIUM' | 'LOW'
  @Prop()
  isSelected!: boolean
  

  isOpen =  false;
  nowIsSelected = false;
  nowPriority = ''

  open() {
    this.isOpen = true
    this.$emit('open', this.isOpen)
  }

  select(priority: 'HIGH' | 'MEDIUM' | 'LOW') {
    this.nowPriority = priority
    this.isOpen = false
    this.nowIsSelected = true
    this.$emit('select', {
      priority,
      isOpen: this.isOpen,
    })
  }

  clear() {
    this.isOpen = false
    this.nowIsSelected = false
  }

  reselect() {
    this.isOpen = true
    this.nowIsSelected = false
    this.$emit('reselect', this.isOpen)
  }

  priorityClass(priority: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    switch(priority) {
      case 'HIGH':
        return 'high-priority'
      case 'MEDIUM':
        return 'medium-priority'
      case 'LOW':
        return'low-priority'
    }
  }
  created() {
    this.nowPriority = this.priority
    this.nowIsSelected = this.isSelected
  }
}
</script>
<style scoped>
  .drop-down-button {
    border: 1px solid grey;
    width: 150px;
    height: 30px;
    font-size: 17px;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    color: grey;
    cursor: pointer;
  }

  ul {
    margin: 15px 0px;
    list-style: none;
    padding-right: 36px;
    font-size: 20px;
    color: grey;
  }

  .high-priority, .medium-priority, .low-priority {
    width: 100px;
    height: 30px;
    font-size: 20px;
    margin: 0px auto;
    cursor: pointer;
  }

  .high-priority {
    color: red;
  }

  .medium-priority {
    color: green;
  }

  .low-priority {
    color: blue;
  }
  .drop-down-items {
    width: 150px;
    height: 30px;
    font-size: 20px;
    margin: 0px auto 50px;
    cursor: pointer;
  }
  
  .select-box {
    width: 150px;
    margin: 5px auto;
  }

</style>
