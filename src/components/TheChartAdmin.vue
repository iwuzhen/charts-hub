<script setup lang="ts">
import { useRequest } from 'alova'
import { usePagination } from '@alova/scene-vue'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import { DeleteChartInfo, GetChartInfoBatch, PutChartInfo } from '~/utils/request'

const newPathFormConfigJson = {
  widgetList: [
    {
      type: 'grid',
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
              type: 'input',
              icon: 'text-field',
              formItemFlag: true,
              options: {
                name: 'path',
                label: 'path',
                labelAlign: '',
                type: 'text',
                defaultValue: '',
                placeholder: '',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: '',
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
                buttonIcon: 'el-icon-search',
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
                onAppendButtonClick: '',
              },
              id: 'input58110',
            },
          ],
          options: {
            name: 'gridCol110156',
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
          id: 'grid-col-110156',
        },
        {
          type: 'grid-col',
          category: 'container',
          icon: 'grid-col',
          internal: true,
          widgetList: [
            {
              type: 'input',
              icon: 'text-field',
              formItemFlag: true,
              options: {
                name: 'name',
                label: 'name',
                labelAlign: '',
                type: 'text',
                defaultValue: '',
                placeholder: '',
                columnWidth: '200px',
                size: '',
                labelWidth: null,
                labelHidden: false,
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                showPassword: false,
                required: true,
                requiredHint: '',
                validation: '',
                validationHint: '',
                customClass: '',
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
                buttonIcon: 'el-icon-search',
                onCreated: '',
                onMounted: '',
                onInput: '',
                onChange: '',
                onFocus: '',
                onBlur: '',
                onValidate: '',
                onAppendButtonClick: '',
              },
              id: 'input80749',
            },
          ],
          options: {
            name: 'gridCol41620',
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
          id: 'grid-col-41620',
        },
      ],
      options: {
        name: 'grid62860',
        hidden: false,
        gutter: 12,
        colHeight: null,
        customClass: [],
      },
      id: 'grid62860',
    },
  ],
  formConfig: {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'right',
    size: '',
    labelAlign: 'label-left-align',
    cssCode: '',
    customClass: [],
    functions: '',
    layoutType: 'PC',
    onFormCreated: '',
    onFormMounted: '',
    onFormDataChange: '',
  },
}
const newFormData = reactive({})
const vFormRef = ref<any>(null)

const router = useRouter()

const refEditor = ref<any>()
const tableIndex = ref(-1)
const editorPathDisable = ref(true)

const {
  // 加载状态
  loading,

  // 列表数据
  data: tableData,

  // 是否为最后一页
  // 下拉加载时可通过此参数判断是否还需要加载
  // isLastPage,

  // 当前页码，改变此页码将自动触发请求
  page,

  // 每页数据条数
  pageSize,
  total,

  // 列表项移除函数
  // remove,

  // 列表项插入函数
  // insert,

  // 刷新函数,你可以指定刷新某一页数据
  refresh,

  // 重置函数，调用后将清空数据并重新加载第一页
  // reload,
  error,
} = usePagination(
  // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
  GetChartInfoBatch,
  {
    // watchingStates: [studentName, clsName], // 外部监听的状态，如搜索条件
    initialData: [], // 请求前的初始数据，
    debounce: 300, // 防抖参数，单位为毫秒数，也可以设置为数组对watchingStates单独设置防抖时间
    // append: true, // 是否启用追加模式，在下拉加载时需设置为true，默认为false
    // preloadPreviousPage: true, // 是否预加载上一页数据，默认为true
    // preloadNextPage: true, // 是否预加载下一页数据，默认为true
    total: res => res.total, // 指定如何获取列表项总数值，res为响应数据，默认获取res.total
    data: res => res.data, // 指定如何获取列表数据，res为响应数据，默认获取res.data
    initialPage: 1, // 初始页码，默认为1
    initialPageSize: 15, // 初始每页数据条数，默认为10
    immediate: true, // 是否立即发出请求，默认为true
  },
)

const { send: sendPut } = useRequest(
  PutChartInfo,
  {
    force: true,
    immediate: false,
  },
)

// const tableData = ref<ChartInfoModel[]>()
onMounted(() => {
})

// const formData = ref<ChartInfoModel>({} as ChartInfoModel)
const formData = computed({
  get() {
    if (tableIndex.value >= 0) {
      const data = tableData.value[tableIndex.value]
      if (Array.isArray(data.tags))
        data.tags = data.tags.join(',')
      return data
    }
    else {
      return {
        title: '',
        path: '',
        version: 'v1',
        tags: '',
        description: '',
        form_schema: '',
        form_handler: '',
        extra_data: {},
      } as ChartInfoModel
    }
  },
  set(newValue: any) {
    if (tableIndex.value >= 0) {
      const tags = newValue.tags.replaceAll('，', ',')
      tableData.value[tableIndex.value] = newValue
      tableData.value[tableIndex.value].tags = tags.split(',')
    }
  },
})

const dialogVisible = ref(false)

function editChart(index: number) {
  const obj = tableData.value[index]
  router.push(`/edit/chart/${obj.path}`)
}

function editDocument(index: number) {
  const obj = tableData.value[index]
  router.push(`/edit/document/${obj.path}`)
}

function submitForm() {
  vFormRef.value.getFormData().then((formData: any) => {
    router.push(`/edit/chart/${formData.path}/${formData.name}`)
  }).catch((error: any) => {
    ElMessage.error(error)
  })
}

async function handleDelete(index: number) {
  console.log('try to delete ', index)
  const { data } = await DeleteChartInfo(tableData.value[index]).send(true)
  console.log('handleDelete', data)
  refresh(page.value)
}

function handleDialogClose() {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      dialogVisible.value = false
    })
    .catch(() => {
    })
}
function updateChartInfo() {
  const infoData = refEditor.value.getPageFormData()
  if (infoData === undefined)
    return

  if (typeof infoData.tags === 'string') {
    const tags = infoData.tags.replaceAll('，', ',')
    infoData.tags = tags.split(',')
  }
  console.log('infoData', infoData)
  sendPut(infoData)
    .then((result) => {
      console.log('新增todo项成功，响应数据为:', result)
      if (result === true) {
        dialogVisible.value = false
        refresh(page.value)
        ElMessage.success('更新成功')
      }
      else {
        console.log('新增todo项失败，错误信息为:', error)
        ElMessage.error(`更新失败  ${JSON.stringify(result)}`)
      }
      // send()
    })
    .catch((error) => {
      console.log('新增todo项失败，错误信息为:', error)
      ElMessage.error('更新失败')
    })
}
</script>

<template>
  <el-row :loading="loading" justify="center">
    <ElTable :data="tableData" table-layout="auto" flexible>
      <!-- <el-table-column prop="id" label="ID" width="120" /> -->
      <el-table-column prop="path" label="Path" width="150">
        <template #default="scope">
          <RouterLink :to="`/view/chart/${scope.row.path}`">
            {{ scope.row.path }}
          </RouterLink>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Name" width="120" />
      <el-table-column prop="version" label="version" width="80" />
      <el-table-column prop="tags" label="tags" width="120" />
      <el-table-column prop="description" label="description" width="120">
        <template #default="scope">
          <el-text truncated w-30>
            {{ scope.row.description }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="create time" width="220">
        <template #default="scope">
          <el-text truncated>
            {{ dayjs(scope.row.create_time).format('YYYY年MM月DD日 HH:mm:ss') }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="320">
        <template #header>
          <el-button size="default" type="default" @click.prevent="dialogVisible = true">
            New Chart
          </el-button>
        </template>
        <template #default="scope:any">
          <el-button type="primary" size="small" @click.prevent="editChart(scope.$index)">
            Edit Chart
          </el-button>
          <el-button type="primary" size="small" @click.prevent="editDocument(scope.$index)">
            Document
          </el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index)">
            <template #reference>
              <el-button link type="danger" size="small">
                Delete
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </ElTable>
  </el-row>
  <el-row justify="center" mb-20 mt-10>
    <el-pagination
      v-model:current-page="page" background layout="prev, pager, next" :total="total" :page-size="pageSize"
    />
  </el-row>

  <el-dialog
    v-model="dialogVisible"
    title="添加 chart"
    destroy-on-close
    center

    :before-close="handleDialogClose"
  >
    <v-form-render ref="vFormRef" :form-json="newPathFormConfigJson" :form-data="newFormData" />
    <el-button type="primary" @click="submitForm">
      确定
    </el-button>
    <el-button type="default" @click="dialogVisible = false">
      取消
    </el-button>
  </el-dialog>

  <el-dialog
    title="Editor"
    destroy-on-close
    center
    fullscreen
    :before-close="handleDialogClose"
  >
    <ChartAdminInfoEditor ref="refEditor" :model-value="formData" :editor-path-disable="editorPathDisable" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDialogClose">Cancel</el-button>
        <el-button type="primary" @click="updateChartInfo">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
