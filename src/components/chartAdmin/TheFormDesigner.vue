<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  // rule: Rule
  // option: Options
}>()

const emit = defineEmits(['change'])
const dialogVisible = ref(false)

const vfdRef = ref<any>()

const testBanned = ref([
  // 'sub-form',
  // 'alert',
])
const designerConfig = reactive({
  // languageMenu: true,
  externalLink: true,
  // formTemplates: false,
  // eventCollapse: false,
  clearDesignerButton: true,
  previewFormButton: true,
  generateSFCButton: false,
  exportCodeButton: false, // 是否显示导出代码按钮
  productName: '表单设计VForm',
  productTitle: '图表设计',
  logoHeader: false,

  // presetCssCode: '.abc { font-size: 16px; }',
})

// 尽量使用同步watch，停止后会自动回收
// 加载 design data
watch(() => vfdRef.value, () => {
  // 加载数据
  if (vfdRef.value) {
    try {
      vfdRef.value.setFormJson(props.modelValue)
    }
    catch (error) {
      console.error(error)
    }
  }
})

onMounted(() => {
  // designer.value.addComponent(WangEditor)
  // // 插入拖拽按钮到`main`分类下
  // designer.value.appendMenuItem('main', {
  //   icon: WangEditor.icon,
  //   name: WangEditor.name,
  //   label: WangEditor.label,
  // })
  // if (Object.keys(props.option).length > 0)
  //   designer.value.setOption(props.option)
  // if (Object.keys(props.rule).length > 0)
  //   designer.value.setRule(props.rule)
  // console.log('FcDesigner.makeOptionsRule', FcDesigner.makeOptionsRule)
})

function saveFormJson() {
  const formJson = vfdRef.value.getFormJson()
  // TODO: 将formJson提交给后端保存接口，需自行实现！！
  emit('change', JSON.stringify(formJson))
  ElMessage.success('表单已保存！')
  dialogVisible.value = false
}
function handleDialogClose() {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      dialogVisible.value = false
    })
    .catch(() => {
    })
}
function testFunction() {
  console.log(vfdRef.value.getFieldWidgets())
}
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    设计表单
  </el-button>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="表单设计"
      fullscreen
      destroy-on-close
      center
      :before-close="handleDialogClose"
    >
      <v-form-designer
        ref="vfdRef"
        :banned-widgets="testBanned"
        :designer-config="designerConfig"
      >
        <template #customToolButtons>
          <el-button type="text" @click="saveFormJson">
            保存
          </el-button>
        </template>
      </v-form-designer>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogClose">取消保存</el-button>
          <el-button type="primary" @click="saveFormJson">
            保存退出
          </el-button>
          <el-button @click="testFunction">
            test
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
