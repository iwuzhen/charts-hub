<script setup lang="ts">
// import formCreate from '@form-create/element-ui'

// formCreate.component('FcEditor', TheWangEditor)
// FcDesigner.component('FcEditor', TheWangEditor)

// const Fc = formCreate.$form()
// const data = ref({})

// const rule = [{
//   type: 'WangEditor',
//   field: 'uni1',
//   title: ' wangEditor',
//   info: '',
//   effect: {
//     fetch: '',
//   },
//   $required: false,
//   _fc_drag_tag: 'WangEditor',
//   hidden: false,
//   display: true,
//   value: '<p>ddada</p>',
// }, { type: 'input', field: 'Fopi5ykk4lkll', title: '输入框', info: '', $required: false, _fc_drag_tag: 'input', hidden: false, display: true },
// { type: 'fc-editor', field: 'F6dj5ykk4np2q', title: '富文本框', info: '', $required: false, _fc_drag_tag: 'fc-editor', hidden: false, display: true }]
const eTab = ref('first')
</script>

<template>
  <div>
    <!-- <TheWangEditor text-left :model-value="`ccwzzz${123}`" /> -->
    <!-- <Fc v-model="data" :rule="rule" /> -->
    <!-- <TheFormDesigner /> -->
    <el-tabs :model-value="eTab" class="demo-tabs">
      <el-tab-pane label="图表编辑器" name="first">
        <TheChartAdmin />
      </el-tab-pane>
      <el-tab-pane label="文档编辑器(建立新的page)" name="second">
        <TheDocumentAdmin />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
