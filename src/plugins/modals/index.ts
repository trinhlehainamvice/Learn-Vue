import { reactive, type App, type Plugin } from 'vue'
import Modal from './ModalTemplate.vue'

type TModal = {
  name: string
  resolve?: Function
  reject?: Function
}

const _self = reactive<TModal>({
  name: ''
})

const _api: ModalApi = {
  active() {
    return _self.name
  },
  show(name: string) {
    _self.name = name
    return new Promise((resolve, reject) => {
      _self.resolve = resolve
      _self.reject = reject
    })
  },
  accept() {
    _self.resolve && _self.resolve()
    _self.name = ''
  },
  cancel() {
    _self.reject && _self.reject()
    _self.name = ''
  }
}

const plugin: Plugin = {
  install(app: App, options?: any[]): void {
    app.component('ModalView', Modal)
    app.provide('$modal', _api)
  }
}

export interface ModalApi {
  active: () => string
  show: (name: string) => Promise<void>
  accept: () => void
  cancel: () => void
}

export default plugin
