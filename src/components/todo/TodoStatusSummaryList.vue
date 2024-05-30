<script setup lang="ts">
import { computed } from 'vue'
import { EItemStatus, type TodoItem } from '@services/todo'

const $self = defineProps({
  items: { type: Array as () => TodoItem[], default: () => [] }
})

const _status_list = computed(() => {
  const status_list = $self.items.reduce(
    (acc, item) => {
      if (item.status === EItemStatus.pending) {
        acc.pending.total += 1
      } else if (item.status === EItemStatus.in_progress) {
        acc.in_progress.total += 1
      } else if (item.status === EItemStatus.completed) {
        acc.completed.total += 1
      }
      return acc
    },
    {
      pending: {
        total: 0,
        name: 'statuses.pending',
        bg_color: 'bg-primary-0',
        text_color: 'text-black'
      },
      in_progress: {
        total: 0,
        name: 'statuses.in-progress',
        bg_color: 'bg-primary-600',
        text_color: 'text-white'
      },
      completed: {
        total: 0,
        name: 'statuses.completed',
        bg_color: 'bg-primary-400',
        text_color: 'text-white'
      }
    }
  )

  return status_list
})

const get_status_summary = (status: string) => {
  if (status in _status_list.value)
    return _status_list.value[status as keyof typeof _status_list.value]
  return { total: 0, name: '', bg_color: '', text_color: '' }
}
</script>

<template>
  <div class="flex flex-row gap-x-4 justify-center w-full">
    <div
      v-for="item in Object.keys(_status_list)"
      :key="item"
      :class="get_status_summary(item).bg_color + ' ' + get_status_summary(item).text_color"
      class="flex flex-col gap-y-2 py-4 px-3 w-1/3 font-bold"
    >
      <span class="text-xl">{{ $t(get_status_summary(item).name) }}</span>
      <span class="text-6xl">{{ get_status_summary(item).total }}</span>
    </div>
  </div>
</template>
