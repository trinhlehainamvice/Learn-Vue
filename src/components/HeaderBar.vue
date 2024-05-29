<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex flex-row gap-x-3 items-center text-white">
        <i class="fa-solid fa-bars" />
        <span>Todo List</span>
      </div>
    </template>
  </Toolbar>
</template>
