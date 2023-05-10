<script setup lang="ts">
import { useRequest } from 'alova'
import { GetChartInfo } from '~/utils/request'

const props = defineProps<{
  path: string
  name: string
}>()

const router = useRouter()

// const formData = JSON.parse(router.currentRoute.value.query.form)
const formData = router.currentRoute.value.query.form
console.log('formData', formData)

const {
  // loading,
  data,
  onError,
  // 第一个参数必须为返回method实例的函数
} = useRequest(
  () => GetChartInfo(`${props.path}/${props.name}`),
  {
  },
)
onError((event) => {
  console.log('请求失败，错误信息为:', event.error)
  console.log('本次请求的method实例为:', event.method)
})

function changeFormData(formData: any) {
  const path = router.currentRoute.value.path
  router.replace(`${path}?form=${JSON.stringify(formData)}`)
}
</script>

<template>
  <el-card class="mx-auto max-w-7xl w-full">
    <template #header>
      <TheChartDesk v-if="data" :model-value="data" :form-data="formData as string" @changeFormData="changeFormData" />
    </template>
    <el-row>
      <el-col><TheDocumentView :path="props.path" :name="props.name" /></el-col>
    </el-row>
  </el-card>
</template>
