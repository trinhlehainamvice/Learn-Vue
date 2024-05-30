<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex flex-row gap-x-3 items-center text-3xl font-bold text-black">
        <i class="fa-solid fa-bars" />
        <span>{{ $t('titles.todo-list') }}</span>
      </div>
    </template>
  </Toolbar>
</template>
