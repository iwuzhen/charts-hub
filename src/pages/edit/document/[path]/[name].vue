<script setup lang="ts">
import { useRequest } from 'alova'
import { ElMessage, ElNotification } from 'element-plus'
import { GetChartDocument, PutChartDocument } from '~/utils/request'

const props = defineProps<{
  path: string
  name: string
}>()

// const vFormPreviewRef = ref<any>(null)
// chartInfo 表单
const vPageFormRef = ref<any>(null)

const {
  loading,
  data: pageFormData,
  onSuccess,
  onError,
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
  },
)

// 没有数据的时候，初始化表单
onError((event: any) => {
  console.log('event', event.error.message)
  pageFormData.value = {
    title: '',
    path: `${props.path}/${props.name}`,
    version: 'v1',
    document: '',
    extra_data: {},
  }
  if (event.error.message === 'not found') {
    ElNotification({
      title: 'New',
      message: '这是一个新的 document',
      type: 'success',
    })
  }
  else { ElMessage.warning(`请求数据失败：${event.error.message}`) }
})

onSuccess(() => {
  vPageFormRef.value.setFormData(pageFormData.value)
})

const optionData = reactive({})

function formChange([fieldName, newValue]: [string, string]) {
  (pageFormData.value as any)[fieldName] = newValue
}

// chartInfo 表单JSON
const FormSchemaJson = {
  widgetList: [
    {
      key: 87010,
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
              key: 77097,
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
                placeholder: '',
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
              id: 'input71521',
            },
          ],
          options: {
            name: 'gridCol57427',
            hidden: false,
            span: 8,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: 'grid-col-57427',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 77097,
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
                placeholder: '说明',
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
                required: false,
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
              id: 'input37449',
            },
          ],
          options: {
            name: 'gridCol92056',
            hidden: false,
            span: 10,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: 'grid-col-92056',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              key: 95560,
              type: 'select',
              icon: 'select-field',
              formItemFlag: true,
              options: {
                name: 'version',
                label: 'version',
                labelAlign: '',
                defaultValue: 'v1',
                placeholder: '',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                labelWrap: false,
                disabled: false,
                hidden: false,
                clearable: true,
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
                    value: 'v1',
                  },
                ],
                required: false,
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
              id: 'select56733',
            },
          ],
          options: {
            name: 'version',
            hidden: false,
            span: 6,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false,
            md: 12,
            sm: 12,
            xs: 12,
            customClass: [],
          },
          id: 'grid-col-74720',
        },
      ],
      options: {
        name: 'grid21410',
        hidden: false,
        gutter: 12,
        colHeight: null,
        customClass: [],
      },
      id: 'grid21410',
    },
  ],
  formConfig: {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'left',
    size: '',
    labelAlign: 'label-right-align',
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

const {
//   loading,
  send: sendPut,
  onSuccess: watchSuccess,
//   error,
} = useRequest(
  PutChartDocument,
  {
    force: true,
    immediate: false,
  },
)

watchSuccess(() => {
  ElNotification({
    title: 'Success',
    message: '更新成功',
    type: 'success',
  })
})

// watchEffect(() => {
//   if (pageFormData.value && autoSave.value) {
//     console.log('pageFormData.value', pageFormData.value)
//     _.debounce(() => {
//       sendPut(pageFormData.value)
//     }, 5000)
//   }
// })

function editorUpdate(html: string) {
  console.log('editorUpdate', html)
  pageFormData.value.document = html
}

function saveDocument() {
  sendPut(pageFormData.value)
}

const router = useRouter()
</script>

<template>
  <el-main v-loading="loading">
    <h1> document editor</h1>
    <el-row>
      <el-col col="24">
        <v-form-render ref="vPageFormRef" :form-json="FormSchemaJson" :form-data="pageFormData" :option-data="optionData" @form-change="formChange" />
      </el-col>
    </el-row>

    <!-- 表单预览 -->
    <el-row>
      <el-col :span="4">
        <el-button-group>
          <el-button type="success" @click="saveDocument">
            保存
          </el-button>
          <!-- <el-button type="primary">
            预览
          </el-button> -->
          <el-button type="primary" @click="router.go(-1)">
            回退
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <TheWangEditor :model-value="pageFormData.document" :disabled="false" @change="editorUpdate" />
      </el-col>
    </el-row>
  </el-main>
</template>
