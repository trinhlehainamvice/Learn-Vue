<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import type { ModalApi } from '@plugins/modals'
import TodoItemForm from './components/todo/TodoItemForm.vue'
import Modal from './plugins/modals/ModalTemplate.vue'
import HeaderBar from './components/HeaderBar.vue'
import { EItemStatus, type TodoItem } from '@services/todo'
import TodoStatusSummaryList from './components/todo/TodoStatusSummaryList.vue'
import TodoItemList from './components/todo/TodoItemList.vue'
import TodoItemSearch from './components/todo/TodoItemSearch.vue'

const MODAL = {
  addItem: 'addItem',
  editItem: 'editItem',
  removeItem: 'removeItem'
} as const

const _todo_list = ref<TodoItem[]>([])
const _content = ref('')
const _search = ref('')
const _status = ref<string>(EItemStatus.pending)
const $modal = inject<ModalApi>('$modal')
const add_item = () => {
  $modal
    ?.show(MODAL.addItem)
    .then(() => {
      _todo_list.value.push({
        id: Date.now().valueOf(),
        content: _content.value,
        status: _status.value as TodoItem['status']
      })
      _content.value = ''
      _status.value = EItemStatus.pending
    })
    .catch(() => {})
}
const remove_item = (id: number) => {
  const index = _todo_list.value.findIndex((item) => item.id === id)
  _todo_list.value.splice(index, 1)
}
const edit_item = (id: number) => {
  const index = _todo_list.value.findIndex((item) => item.id === id)

  _content.value = _todo_list.value[index].content
  _status.value = _todo_list.value[index].status
  $modal
    ?.show(MODAL.editItem)
    .then(() => {
      _todo_list.value[index].content = _content.value
      _todo_list.value[index].status = _status.value as TodoItem['status']
      _content.value = ''
      _status.value = EItemStatus.pending
    })
    .catch(() => {
      _content.value = ''
      _status.value = EItemStatus.pending
    })
}
const _searched_list = computed(() => {
  if (_search.value === '') return _todo_list.value
  return _todo_list.value.filter((item) => item.content.includes(_search.value))
})
</script>

<template>
  <!-- background -->
  <div class="w-full min-h-screen">
    <header class="sticky top-0 z-10 w-full">
      <HeaderBar />
    </header>
    <main class="flex flex-col gap-y-4 items-center p-20 mx-auto w-3/5 h-full">
      <TodoStatusSummaryList :items="_todo_list" />
      <TodoItemSearch v-model:search="_search" />
      <TodoItemList
        v-model:items="_searched_list"
        :add_item="add_item"
        :edit_item="edit_item"
        :remove_item="remove_item"
      />
    </main>
    <!-- Modals -->
    <Modal class="z-20" :name="MODAL.addItem" :title="$t('titles.new-item')">
      <TodoItemForm v-model:status="_status" v-model:content="_content" />
    </Modal>
    <Modal class="z-20" :name="MODAL.editItem" :title="$t('titles.edit-item')">
      <TodoItemForm v-model:status="_status" v-model:content="_content" />
    </Modal>
  </div>
</template>
