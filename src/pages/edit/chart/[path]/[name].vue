<script setup lang="ts">
import CodeMirror from 'vue-codemirror6'
import { javascript } from '@codemirror/lang-javascript'
import _ from 'lodash'
import { VueEcharts } from 'vue3-echarts'
import { useRequest } from 'alova'
import { ElMessage } from 'element-plus'
import { GetChartInfo, PutChartInfo, alovaChartInstance } from '~/utils/request'

import { extendEchartsOpts } from '~/utils/echartsOption'

const props = defineProps<{
  path: string
  name: string
}>()

const echartsRef = ref<any>(null)
// 预览 vForm 的 ref
const vFormPreviewRef = ref<any>(null)
// 代码编辑器
const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref()
// chartInfo 表单
const vPageFormRef = ref<any>(null)

// echarts option placeholder
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

// dom 控制台输出日志
const processLog = ref<{
  id: Date
  message: string
}[]>([])

// formData 的预览 string
const formDataPreviewString = ref('{}')

const consoleBackup = console

const {
  loading,
  data: pageFormData,
  onSuccess,
  onError,
} = useRequest(
  () => GetChartInfo(`${props.path}/${props.name}`),
  {
  },
)

// 每个 watchEffect 只完成一件任务
watchEffect(_.debounce(async () => {
  if (pageFormData.value.form_handler && formDataPreviewString.value) {
    processLog.value = []
    const console = {
      log: printToConsole,
      error: printToConsole,
    }

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
      const func = new Function('_', 'formData', 'console', 'post', `return async function(){ ${pageFormData.value.form_handler} }()`)
      const result = await func(_, JSON.parse(formDataPreviewString.value), console, post)
      ElMessage.info('processCode change:')
      echartsOption.value = extendEchartsOpts(result)
    }
    catch (error: any) {
      console.log(error.toString())
      consoleBackup.error(error)
      ElMessage.error(`processCode error:${error}`)
    }
    echartsRef.value.refreshChart()
  }
}, 2000))

// watch(() => pageFormData.value.form_schema, _.debounce(async () => {
//   if (!requestComplete)
//     console.log('test')
// }, 1000))

// 监听渲染的 vFrom
watchEffect(_.debounce(async () => {
  if (pageFormData.value.form_schema) {
    // vFormPreviewRef.value.setRule()
    // vFormPreviewRef.value.setFormJson(JSON.parse(pageFormData.value.form_schema))
    vFormPreviewRef.value.setFormJson(pageFormData.value.form_schema)
    // changeFormPreviewData()
  }
}, 500))

// 没有数据的时候，初始化表单
onError((event: any) => {
  console.log('event', event.error.message)
  pageFormData.value = {
    title: '',
    path: `${props.path}/${props.name}`,
    version: 'v1',
    tags: '',
    description: '',
    form_schema: '',
    form_handler: '',
    extra_data: {},
  }
  if (event.error.message === 'not found')
    ElMessage.info('创建一个新的 chart')
  else
    ElMessage.warning(`请求数据失败：${event.error.message}`)
})

onSuccess(() => {
  if (pageFormData.value.form_handler.length === 0) {
    pageFormData.value.form_handler = `
let result = await fetch("http://httpbin.org/ip")
console.log(formData)
let data = await result.json()
console.log(data.origin)
return data.origin
`
  }
})

const optionData = reactive({})
const dialogPreviewVisible = ref(false)

function formChange([fieldName, newValue]: [string, string]) {
  (pageFormData.value as any)[fieldName] = newValue
}

const renderKey = ref(0)
async function changDesignSetting(designSetting: string) {
  console.log('changDesignSetting, resetForm')
  // vFormPreviewRef.value.resetForm()
  pageFormData.value.form_schema = designSetting
  vFormPreviewRef.value.setFormJson(pageFormData.value.form_schema)
  // renderKey.value += 1
}

function printToConsole(arg: any) {
  processLog.value.push({
    id: new Date(),
    message: JSON.stringify(arg),
  })
}

// function getPageFormData() {
//   parentFormData.value = currentFormData
//   if (chartPaths.value.includes(currentFormData.path) && props.editorPathDisable === false) {
//     ElMessage.error('挂载路径 冲突')
//     return
//   }

//   return toRaw(currentFormData)
// }

// const collapseUnfoldNames = reactive({
//   previewDesign: [],
// })

function changeFormPreviewData(setting: string) {
  console.log('changeFormPreviewData father')
  // formDataPreviewString.value = JSON.stringify(await vFormPreviewRef.value.getFormData())
  formDataPreviewString.value = setting
  console.log('formDataPreviewString.value', formDataPreviewString.value)
}

// chartInfo 表单JSON
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
                readonly: true,
                disabled: true,
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

const { send: sendPut } = useRequest(
  PutChartInfo,
  {
    force: true,
    immediate: false,
  },
)

const router = useRouter()
function updateChartInfo() {
  // const infoData = vPageFormRef.value.getPageFormData()
  // if (infoData === undefined)
  //   return

  if (typeof pageFormData.value.tags === 'string') {
    const tags = pageFormData.value.tags.replaceAll('，', ',')
    pageFormData.value.tags = tags.split(',')
  }
  console.log('pageFormData.value', pageFormData.value)
  sendPut(pageFormData.value)
    .then((result) => {
      console.log('新增todo项成功，响应数据为:', result)
      if (result === true) {
        ElMessage.success('更新成功')
        router.go(-1)
      }

      else { ElMessage.error(`更新失败  ${JSON.stringify(result)}`) }

      // send()
    })
    .catch((error) => {
      console.log('新增todo项失败，错误信息为:', error)
      ElMessage.error('更新失败')
    })
}
</script>

<template>
  <el-main v-if="!loading">
    <h1> chart editor</h1>
    <el-row>
      <el-col col="24">
        <v-form-render ref="vPageFormRef" :form-json="FormSchemaJson" :form-data="pageFormData" :option-data="optionData" @form-change="formChange" />
      </el-col>
    </el-row>
    <el-row flex>
      <el-col :span="16">
        <el-form-item label="表单">
          <el-input :model-value="pageFormData.form_schema" disabled placeholder="请编辑表单" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 表单预览 -->
    <el-row>
      <el-col :key="renderKey" :span="24">
        <TheFormRender ref="vFormPreviewRef" @change="changeFormPreviewData" />
        <!-- <el-collapse v-model="collapseUnfoldNames.previewDesign">
          <el-collapse-item title="表单预览" name="1">
            <v-form-render ref="vFormPreviewRef" @form-change="changeFormPreviewData" />
          </el-collapse-item>
        </el-collapse> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" flex>
        <TheFormDesigner :model-value="pageFormData.form_schema" @change="changDesignSetting" />
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
            async function(_,post){
          </el-text>
        </el-row>
        <el-row>
          <CodeMirror
            ref="cm"
            v-model="pageFormData.form_handler"
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
          <el-col :span="4">
            <el-button type="warning" @click="dialogPreviewVisible = true">
              最终预览
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="success" @click="updateChartInfo">
              保存
            </el-button>
          </el-col>
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
          <VueEcharts ref="echartsRef" :option="echartsOption" style="height: 400px;width: 500px;" />
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
      <TheChartDesk :model-value="pageFormData" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogPreviewVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </el-main>
</template>
