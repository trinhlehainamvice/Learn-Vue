<script setup lang="ts">
import InputText from 'primevue/inputtext'
const $search = defineModel<string>('search')
</script>

<template>
  <div class="relative w-[60%]">
    <i
      class="absolute right-3 top-2/4 -mt-2 text-surface-400 fa-solid fa-search dark:text-surface-600"
    />
    <InputText v-model="$search" placeholder="Search todo content" class="pr-8 pl-4 w-full h-10" />
  </div>
</template>
