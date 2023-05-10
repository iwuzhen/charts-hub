<script setup lang="ts">
// const props = defineProps<{
//   modelValue: string
//   optionData?: any
// }>()

const emit = defineEmits(['change'])
const renderKey = ref(0)

// const formJson = computed(() => {
//   return JSON.parse(props.modelValue)
// })

const vFormRef = ref<any>()
const formJson = ref({})

async function getFormData() {
  // const formData = await vFormRef.value.getFormData()
  emit('change', JSON.stringify(await vFormRef.value.getFormData()))
  // return formData
}

watchEffect(() => {
  if (vFormRef.value) {
    getFormData()
    console.log('reset vFormRef')
  }
})

function setFormJson(data: string) {
  console.log('setFormJson')
  formJson.value = JSON.parse(data)
  // vFormRef.value.setFormJson(data)
  renderKey.value += 1
}

const collapseUnfoldNames = reactive({
  previewDesign: [],
})

defineExpose({ setFormJson })
</script>

<template>
  <el-collapse v-model="collapseUnfoldNames.previewDesign">
    <el-collapse-item title="表单预览" name="1">
      <v-form-render :key="renderKey" ref="vFormRef" :form-json="formJson" @form-change="getFormData" />
    </el-collapse-item>
  </el-collapse>
</template>
