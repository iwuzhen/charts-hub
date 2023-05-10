<script setup lang="ts">
import CodeMirror from 'vue-codemirror6'
import { javascript } from '@codemirror/lang-javascript'
import _ from 'lodash'
import { VueEcharts } from 'vue3-echarts'
import { watch } from 'vue'
import { useRequest } from 'alova'
import { ElMessage } from 'element-plus'
import { GetChartInfoPaths, alovaInstance } from '~/utils/request'
import { extendEchartsOpts } from '~/utils/echartsOption'

const props = defineProps<{
  modelValue: ChartInfoModel
  editorPathDisable: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change'])
const parentFormData = useVModel(props, 'modelValue', emit)
const currentFormData = reactive(props.modelValue)

const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref()

const { data: chartPaths } = useRequest(GetChartInfoPaths, {
  force: true,
  immediate: true,
})

// const chartPathsSet = computed(() => {
//   const resultSet = new Set()
//   chartPaths.value.forEach((item) => {
//     resultSet.add(item)
//   })
//   console.log('resultSet', resultSet)
//   return resultSet
// })

// dom 控制台输出日志
const processLog = ref<{
  id: Date
  message: string
}[]>([])

// formData 的预览 string
const formDataPreviewString = ref('')

// form 的 schema
const FormSchemaJson = {
  widgetList: [
    {
      key: 102481,
      type: 'grid',
      alias: '',
      category: 'container',
      icon: 'grid',
      cols: [
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 43136,
              type: 'input',
              alias: '',
              icon: 'text-field',
              formItemFlag: true,
              options: {
                name: 'path',
                label: '挂载路径',
                labelAlign: '',
                type: 'text',
                defaultValue: '',
                placeholder: 'openalex/entropy-2022',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                readonly: false,
                disabled: props.editorPathDisable, // user modify
                hidden: false,
                clearable: true,
                showPassword: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: [],
                labelIconClass: null,
                labelIconPosition: 'rear',
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: '',
                suffixIcon: '',
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: 'Calendar',
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                // onValidate: 'if chartPathsSet.value.has(value) callback(new Error(\'error message\')) else callback()',
                onValidate: '',
                onAppendButtonClick: '',
              },
              id: 'input27101',
            },
          ],
          options: {
            name: 'gridCol38678',
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: 'grid-col-38678',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 57396,
              type: 'select',
              icon: 'select-field',
              formItemFlag: true,
              options: {
                name: 'version',
                label: 'version',
                labelAlign: '',
                defaultValue: 1,
                placeholder: '',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                disabled: false,
                hidden: false,
                clearable: false,
                filterable: false,
                allowCreate: false,
                remote: false,
                automaticDropdown: false,
                multiple: false,
                multipleLimit: 0,
                dsEnabled: false,
                dsName: '',
                dataSetName: '',
                labelKey: 'label',
                valueKey: 'value',
                optionItems: [
                  {
                    label: 'v1',
                    value: 1,
                  },
                ],
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: [],
                labelIconClass: null,
                labelIconPosition: 'rear',
                labelTooltip: null,
                onCreated: '',
                onMounted: '',
                onRemoteQuery: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
              },
              id: 'select79168',
            },
          ],
          options: {
            name: 'gridCol92584',
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: '',
          },
          id: 'grid-col-92584',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 43136,
              type: 'input',
              alias: '',
              icon: 'text-field',
              formItemFlag: true,
              options: {
                name: 'title',
                label: 'title',
                labelAlign: '',
                type: 'text',
                defaultValue: '',
                placeholder: '请输入图表的名字',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: [],
                labelIconClass: null,
                labelIconPosition: 'rear',
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: '',
                suffixIcon: '',
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: 'custom-search',
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
                onAppendButtonClick: '',
              },
              id: 'input79460',
            },
          ],
          options: {
            name: 'gridCol103959',
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: '',
          },
          id: 'grid-col-103959',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 43136,
              type: 'input',
              alias: '',
              icon: 'text-field',
              formItemFlag: true,
              options: {
                name: 'tags',
                label: '标签',
                labelAlign: '',
                type: 'text',
                defaultValue: '',
                placeholder: '以逗号分隔不同的标签',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: [],
                labelIconClass: null,
                labelIconPosition: 'rear',
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                prefixIcon: '',
                suffixIcon: '',
                appendButton: false,
                appendButtonDisabled: false,
                buttonIcon: 'custom-search',
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
                onAppendButtonClick: '',
              },
              id: 'input68359',
            },
          ],
          options: {
            name: 'gridCol70226',
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: 'grid-col-70226',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 83131,
              type: 'textarea',
              icon: 'textarea-field',
              formItemFlag: true,
              options: {
                name: 'description',
                label: '图表的描述',
                labelAlign: '',
                rows: 3,
                defaultValue: '',
                placeholder: '方法论,摘要等内容',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                readonly: false,
                disabled: false,
                hidden: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: [],
                labelIconClass: null,
                labelIconPosition: 'rear',
                labelTooltip: null,
                minLength: null,
                maxLength: null,
                showWordLimit: false,
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
              },
              id: 'textarea88202',
            },
          ],
          options: {
            name: 'gridCol12568',
            hidden: false,
            span: 23,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: '',
          },
          id: 'grid-col-12568',
        },
      ],
      options: {
        name: 'grid93585',
        hidden: false,
        gutter: 30,
        colHeight: null,
        customClass: [],
      },
      id: 'grid93585',
    },
  ],
  formConfig: {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 90,
    labelPosition: 'left',
    size: '',
    labelAlign: 'label-left-align',
    cssCode: '',
    customClass: [],
    functions: '',
    layoutType: 'PC',
    jsonVersion: 3,
    dataSources: [],
    onFormCreated: '',
    onFormMounted: '',
    onFormDataChange: '',
  },
}

// const formSchema = computed({
//   get() {
//     return parentFormData.value.value.form_schema
//   },
//   set(newValue: string) {
//     parentFormData.value.value.form_schema = newValue
//   },
// })

const formHandle = computed({
  get() {
    if (parentFormData.value.form_handler) {
      return parentFormData.value.form_handler
    }
    else {
      return `
let result = await fetch("http://httpbin.org/ip")
console.log(formData)
let data = await result.json()
console.log(data.origin)
return data.origin
`
    }
  },
  set(newValue: any) {
    parentFormData.value.form_handler = newValue
  },
})

const vFormRef = ref<any>(null)

// store form result data
// const PageFormData = reactive<ChartInfoModel>(currentFormData.value)
const optionData = reactive({})
const dialogPreviewVisible = ref(false)

const echartsOption = ref<any>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
})
const chartRef = ref<any>(null)

function formChange([fieldName, newValue]: [string, string]) {
  (currentFormData as any)[fieldName] = newValue
}

async function changDesignSetting(designSetting: string) {
  currentFormData.form_schema = designSetting
}

function changRenderData(formDataPreview: any) {
  formDataPreviewString.value = JSON.stringify(formDataPreview)
}
function printToConsole(arg: any) {
  processLog.value.push({
    id: new Date(),
    message: JSON.stringify(arg),
  })
}
const consoleBackup = console

function getPageFormData() {
  parentFormData.value = currentFormData
  if (chartPaths.value.includes(currentFormData.path) && props.editorPathDisable === false) {
    ElMessage.error('挂载路径 冲突')
    return
  }

  return toRaw(currentFormData)
}

watch(formHandle, _.debounce(async () => {
  processLog.value = []
  const console = {
    log: printToConsole,
    error: printToConsole,
  }

  const post = async (url: string, body: any) => {
    return await alovaInstance.Post<any>(url, body,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    ).send(true)
  }
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function('_', 'formData', 'console', 'post', `return async function(){ ${formHandle.value} }()`)
    const result = await func(_, JSON.parse(formDataPreviewString.value), console, post)
    ElMessage.error(`processCode change:${result}`)
    echartsOption.value = extendEchartsOpts(result)
  }
  catch (error: any) {
    console.log(error.toString())
    consoleBackup.error(error)
    ElMessage.error(`processCode error:${error}`)
  }

  chartRef.value.refreshChart()
}, 2000))

defineExpose({ getPageFormData })
</script>

<template>
  <el-row>
    <el-col col="24">
      <v-form-render ref="vFormRef" :form-json="FormSchemaJson" :form-data="currentFormData" :option-data="optionData" @form-change="formChange" />
    </el-col>
  </el-row>
  <el-row flex>
    <el-col :span="16">
      <el-form-item label="表单">
        <el-input :model-value="currentFormData.form_schema" disabled placeholder="请编辑表单" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="4" flex>
      <TheFormDesigner :model-value="currentFormData.form_schema" @change="changDesignSetting" />
      <TheFormRender :model-value="currentFormData.form_schema" @change="changRenderData" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="4">
      <!-- <TheFormDesigner @change="changDesignSetting" /> -->
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <!-- left -->
    <el-col :span="12">
      <el-row>
        <el-text type="primary">
          数据处理：包含搜集表单数据，处理数据，请求图表数据，将图表数据处理成 echarts option,
          传入的参数包括 _: lodash 工具
        </el-text>
      </el-row>
      <el-row>
        <el-text>
          async function(_,){
        </el-text>
      </el-row>
      <el-row>
        <CodeMirror
          ref="cm"
          v-model="formHandle"
          :lang="javascript()"
          basic wrap text-left
        />
      </el-row>
      <el-row>
        <el-text>
          }
        </el-text>
      </el-row>
      <el-row>
        <el-button type="warning" @click="dialogPreviewVisible = true">
          最终预览
        </el-button>
      </el-row>
    </el-col>
    <!-- right -->
    <el-col :span="12">
      <el-row>
        <el-text type="primary">
          formData preview
        </el-text>
      </el-row>
      <el-row>
        <!-- <CodeMirror
          v-model="formDataPreviewString"
          :lang="javascript()"
          basic wrap disabled text-left
        /> -->
        <el-text>{{ formDataPreviewString }}</el-text>
      </el-row>
      <el-row>
        <el-text type="primary">
          console.log output
        </el-text>
      </el-row>
      <el-row>
        <TheLogOutput :logs="processLog" />
      </el-row>
      <el-row>
        <el-text type="primary">
          预览 echarts
        </el-text>
      </el-row>
      <el-row>
        <VueEcharts ref="chartRef" :option="echartsOption" style="height: 400px;width: 500px;" />
      </el-row>
    </el-col>
  </el-row>
  <el-dialog
    v-model="dialogPreviewVisible"
    title="chart 预览"
    destroy-on-close
    fullscreen
    center
  >
    <TheChartDesk :model-value="currentFormData" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogPreviewVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>
