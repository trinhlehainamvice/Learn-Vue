<script setup lang="ts">
import type { TodoItem } from '@services/todo'
import Button from 'primevue/button'
import todoService from '@services/todo'

const $self = defineProps({
  items: { type: Array as () => TodoItem[], default: () => [] },
  add_item: { type: Function, default: () => {} },
  remove_item: { type: Function, default: (_: number) => {} },
  edit_item: { type: Function, default: (_: number) => {} }
})
</script>

<template>
  <!-- Todo Item Labels -->
  <header class="flex sticky top-0 flex-row items-center py-2 w-full border-gray-400 border-y-4">
    <span class="py-2 px-4 font-bold">Status</span>
    <span class="py-2 px-4 font-bold">Content</span>
    <Button
      class="right-4 ml-auto"
      :label="$t('new-item')"
      icon="pi pi-plus"
      severity="info"
      @click="$self.add_item"
    />
  </header>
  <main class="flex flex-col gap-y-2 items-center w-full">
    <div
      v-for="item in $self.items"
      :key="item.id"
      class="flex relative flex-row items-center w-full"
    >
      <i class="absolute left-7" :class="todoService.getStatusIcon(item.status)" />
      <span class="absolute left-[5.5rem]">{{ item.content }}</span>
      <div class="flex flex-row gap-x-2 pr-6 ml-auto">
        <Button
          aria-label="Edit"
          icon="pi pi-pencil"
          severity="info"
          @click="$self.edit_item(item.id)"
        />
        <Button
          aria-label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="$self.remove_item(item.id)"
        />
      </div>
    </div>
  </main>
</template>
