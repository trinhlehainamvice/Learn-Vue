<script setup lang="ts">
import { computed, inject } from 'vue'
import { type ModalApi } from '@plugins/modals'

const $props = defineProps({
  // Modal identifier
  name: { type: String, default: '' },
  // Modal header title
  title: { type: String, default: 'Modal Title' }
})
const $modal = inject<ModalApi>('$modal')
const _show = computed(() => {
  return $modal?.active() === $props.name
})
</script>

<template>
  <!-- Modal Container with transparent background -->
  <div
    class="flex fixed top-0 left-0 justify-center items-center w-full h-full bg-black bg-opacity-50"
    v-show="_show"
  >
    <!-- Modal Container -->
    <div class="flex flex-col items-center w-1/3 h-1/3 bg-white">
      <!-- Modal title header -->
      <header class="items-center py-2 pl-5 w-full text-2xl text-white bg-blue-500">
        {{ $props.title }}
      </header>
      <!-- Modal Content -->
      <main class="container flex-grow mx-auto">
        <slot />
      </main>
      <!-- Modal Footer bottom of container -->
      <footer class="flex flex-row gap-x-4 justify-end items-center py-2 px-5 w-full">
        <!-- Modal Accept Button -->
        <button
          class="w-20 h-10 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          @click="$modal?.accept()"
        >
          Accept
        </button>
        <!-- Modal Close Button -->
        <button
          class="w-20 h-10 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          @click="$modal?.cancel()"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>
