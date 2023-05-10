<script setup lang="ts">
import _ from 'lodash'
import { VueEcharts } from 'vue3-echarts'
import { dayjs } from 'element-plus'
import { alovaChartInstance } from '~/utils/request'
import { extendEchartsOpts } from '~/utils/echartsOption'

const props = defineProps<{
  modelValue: ChartInfoModel
  formData?: string
}>()

const emit = defineEmits(['changeFormData'])

const chartRef = ref<any>(null)
const formData = typeof props.formData === 'undefined' ? {} : JSON.parse(props.formData)
const vFormRef = ref<any>()
const echartsOption = ref<any>()
const loading = ref(false)

// watch(formData, useDebounceFn(() => {
// }, 1000))

const changeFormData = useDebounceFn(async () => {
  loading.value = true
  const childFormData = await vFormRef.value.getFormData()
  emit('changeFormData', childFormData)

  //   console.log('childFormData', childFormData)
  const post = async (url: string, body: any) => {
    return await alovaChartInstance.Post<any>(url, body,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    ).send(true)
  }
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function('_', 'formData', 'post', `return async function(){ ${props.modelValue.form_handler} }()`)
    const result = await func(_, Object.assign({}, childFormData), post)
    echartsOption.value = extendEchartsOpts(result)
  }
  catch (error: any) {
    console.error(error)
    ElMessage(`processCode error:${error}`)
  }
  loading.value = false
}, 1000)
onMounted(async () => {
//   console.log('props.modelValue', props.modelValue)
//   console.log('props.formData', props.formData)
  vFormRef.value.setFormJson(props.modelValue.form_schema)
  await changeFormData()
  chartRef.value.refreshChart()
})

const collapseFlag = ref(['1'])
</script>

<template>
  <el-row justify="center">
    <el-col :span="23">
      <el-space direction="vertical">
        <h1>{{ props.modelValue.title }}</h1>
        <el-text>{{ props.modelValue.description }}</el-text>
        <div class="flex flex-wrap justify-center gap-2">
          <div v-for="tag in props.modelValue.tags" :key="tag">
            <el-tag>{{ tag }}</el-tag>
          </div>
        </div>
        <el-text mt-20>
          {{ dayjs(props.modelValue.create_time).format('YYYY年MM月DD日 HH:mm:ss') }}
        </el-text>
      </el-space>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="23">
      <el-collapse v-model="collapseFlag" mt-10>
        <el-collapse-item title="control" name="1">
          <v-form-render ref="vFormRef" :form-data="formData" @form-change="changeFormData" />
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
  <el-row v-loading="loading" mt-20>
    <VueEcharts ref="chartRef" :option="echartsOption" theme="myTheme_1" style="height: 900px;width: 1200px;" />
  </el-row>
</template>
