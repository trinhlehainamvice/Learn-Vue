<script setup lang="ts">
import { EItemStatus } from '@services/todo'

const $self = defineProps({
  status: { type: String, default: EItemStatus.pending }
})

const _icons = {
  [EItemStatus.pending]: 'fa-solid fa-hourglass-start',
  [EItemStatus.in_progress]: 'fa-solid fa-spinner',
  [EItemStatus.completed]: 'fa-solid fa-check'
}
</script>

<template>
  <div class="flex flex-row gap-x-2 items-center">
    <i :class="_icons[$self.status as EItemStatus]" />
    <span>{{ $self.status }}</span>
  </div>
</template>
