<script setup lang="ts">
import { ref, computed } from 'vue'
type Item = { id: number; content: string; done: boolean }
const _input = ref('')
const _todo_list = ref<Item[]>([])
const _pending_list = computed(() => {
  return _todo_list.value.filter((item) => !item.done)
})
const _done_list = computed(() => {
  return _todo_list.value.filter((item) => item.done)
})
const clear_input = () => {
  _input.value = ''
}
const add_todo = () => {
  if (_input.value === '') return
  _todo_list.value.push({ id: Date.now().valueOf(), content: _input.value, done: false })
  _input.value = ''
}
const delete_todo = (id: number) => {
  const index = _todo_list.value.findIndex((item) => item.id === id)
  _todo_list.value.splice(index, 1)
}
</script>

<template>
  <!-- Todo Container -->
  <div class="flex flex-col items-center w-full h-full bg-white">
    <!-- Header -->
    <div
      class="items-center py-5 pl-5 w-full text-5xl text-white bg-black border-b-8 border-blue-500"
    >
      <h1>
        <i class="fa-solid fa-clipboard-list" />
        To-Do List
      </h1>
    </div>
    <!-- Todo Input -->
    <div class="flex flex-row justify-center items-center px-5 w-full h-20 bg-white">
      <input
        v-model="_input"
        type="text"
        placeholder=" What needs to be done?"
        class="w-3/4 h-10 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        @keyup.enter="add_todo"
      />
      <div class="flex flex-row gap-x-2 justify-center items-center pl-4 w-1/4 h-10">
        <button
          class="w-1/2 h-full text-black bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none fa-solid fa-eraser"
          @click="clear_input"
        />
        <button
          class="w-1/2 h-full text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none fa-solid fa-plus"
          @click="add_todo"
        />
      </div>
    </div>
    <!-- Todo Pending List -->
    <!-- Pending Header -->
    <div class="items-center py-2 pl-5 w-full text-2xl text-white bg-blue-500">
      Pending
      {{ _pending_list.length }}
    </div>
    <!-- Pending List -->
    <div
      v-for="item in _pending_list"
      :key="item.id"
      class="flex flex-row gap-x-5 items-center py-2 px-5 w-full"
    >
      <input :checked="item.done" type="checkbox" class="w-5 h-5" @click="item.done = !item.done" />
      <label
        class="w-3/4 h-8 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      >
        {{ item.content }}
      </label>
      <button
        class="w-8 h-8 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none fa-solid fa-trash-can"
        @click="delete_todo(item.id)"
      />
    </div>
    <!-- Todo Done List -->
    <!-- Done Header -->
    <div class="items-center py-2 pl-5 w-full text-2xl text-white bg-blue-500">
      Done
      {{ _done_list.length }}
    </div>
    <!-- Done List -->
    <div
      v-for="item in _done_list"
      :key="item.id"
      class="flex flex-row gap-x-5 items-center py-2 px-5 w-full"
    >
      <input :checked="item.done" type="checkbox" class="w-5 h-5" @click="item.done = !item.done" />
      <label
        class="w-3/4 h-8 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      >
        {{ item.content }}
      </label>
      <button
        class="w-8 h-8 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none fa-solid fa-trash-can"
        @click="delete_todo(item.id)"
      />
    </div>
  </div>
</template>
