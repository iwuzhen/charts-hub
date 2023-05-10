<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { useVModel } from '@vueuse/core'
import { onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const props = defineProps<{
  modelValue: string
  //   init: Function
  disabled?: boolean
//   config: Object
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const valueHtml = useVModel(props, 'modelValue', emit)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  // 选中公式时的悬浮菜单
  placeholder: '请输入内容...',
  scroll: false,
  hoverbarKeys: {
    formula: {
      menuKeys: ['editFormula'], // “编辑公式”菜单
    },
  },

  // 其他...
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  insertKeys: {
    index: 0,
    keys: [
      'insertFormula', // “插入公式”菜单
      'editFormula', // “编辑公式”菜单
    ],
  },
  //   excludeKeys: {

  //   }

  // 其他...
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: IDomEditor) {
  if (props.disabled)
    editor.disable()
  editorRef.value = editor // 记录 editor 实例，重要！
}

function handleChange() {
  // console.log(editorRef.value.getHtml())
  emit('change', editorRef.value.getHtml())
}

const mode = 'simple' // 或 'default'
</script>

<template>
  <div style="border: 1px solid #ccc; text-align: left;">
    <Toolbar
      v-if="!props.disabled"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="min-height: 500px; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
      @onChange="handleChange"
      @onCreated="handleCreated"
    />
  </div>
</template>
