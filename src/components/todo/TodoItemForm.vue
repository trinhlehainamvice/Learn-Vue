<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import todoService from '@services/todo'
import TodoFormItemStatus from './TodoFormItemStatus.vue'

const $status = defineModel<string>('status')
const $content = defineModel<string>('content')
</script>

<template>
  <div class="flex flex-row gap-x-4 justify-center items-center px-4 w-full h-full">
    <span class="relative w-[60%]">
      <i
        class="absolute left-3 top-2/4 -mt-2 text-surface-400 fa-solid fa-pen dark:text-surface-600"
      />
      <InputText
        v-model="$content"
        placeholder="What needs to be done?"
        class="pl-10 w-full h-10"
      />
    </span>
    <Dropdown v-model="$status" :options="todoService.getAllStatus()" class="w-[28%] h-10">
      <template #dropdownicon>
        <i class="fa-solid fa-chevron-down" />
      </template>
      <template #value="slotProps">
        <div class="absolute left-3 top-2/4 -mt-2.5">
          <TodoFormItemStatus v-if="slotProps.value" :status="slotProps.value" />
          <TodoFormItemStatus v-else />
        </div>
      </template>
      <template #option="slotProps">
        <TodoFormItemStatus :status="slotProps.option" />
      </template>
    </Dropdown>
  </div>
</template>
