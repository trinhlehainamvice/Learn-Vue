import { ref, computed, type Ref, toRef } from 'vue'
import { EItemStatus, type TodoItem } from '@services/todo'

export default function useTodo() {
  const todo_list = ref<TodoItem[]>([])

  function add_item(content: string, status: EItemStatus) {
    todo_list.value.push({
      id: Date.now().valueOf(),
      content: content,
      status: status
    })
  }

  function remove_item(id: number) {
    const index = todo_list.value.findIndex((item) => item.id === id)
    todo_list.value.splice(index, 1)
  }

  function edit_item(id: number, content: string, status: EItemStatus) {
    const index = todo_list.value.findIndex((item) => item.id === id)
    if (index === -1) return
    todo_list.value[index].content = content
    todo_list.value[index].status = status as TodoItem['status']
  }

  function filter_by_content(content: Ref<string>) {
    if (!content) return
    return computed(() => todo_list.value.filter((item) => item.content.includes(content.value)))
  }

  return {
    todo_list,
    add_item,
    remove_item,
    edit_item,
    filter_by_content
  }
}
