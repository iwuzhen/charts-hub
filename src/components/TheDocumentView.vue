<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { useRequest } from 'alova'
import { GetChartDocument } from '~/utils/request'

const props = defineProps<{
  path: string
  name: string

}>()

const {
//   loading,
  data: pageFormData,
//   onSuccess,
//   onError,
} = useRequest(
  () => GetChartDocument(`${props.path}/${props.name}`),
  {
    initialData: {
      title: '',
      path: `${props.path}/${props.name}`,
      version: 'v1',
      document: '',
      extra_data: {},
    },
    immediate: true,
  },
)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  // 选中公式时的悬浮菜单
  placeholder: '请输入内容...',
  scroll: false,
  hoverbarKeys: {
  },

}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: IDomEditor) {
  editor.disable()
  editorRef.value = editor // 记录 editor 实例，重要！
}

const mode = 'simple' // 或 'default'
</script>

<template>
  <el-row
    v-if="pageFormData.document.length > 10"
  >
    <Editor
      v-model="pageFormData.document"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </el-row>
</template>
