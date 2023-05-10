const label = ' wangEditor'
const name = 'WangEditor'
let i = 1
function uniqueId() {
  return `uni${i++}`
}

export const WangEditor = {
  // 拖拽组件的图标
  icon: 'icon-editor',
  // 拖拽组件的名称
  label,
  // 拖拽组件的 key
  name,
  // 拖拽组件的生成规则
  rule() {
    // 如果在 props 方法中需要修改 rule 的属性,需要提前在 rule 上定义对应的属性
    return {
      // 生成组件的名称
      type: name,
      // field 自定不能重复,所以这里每次都会生成一个新的
      field: uniqueId(),
      title: label,
      info: '',
      effect: {
        fetch: '',
      },
      // 这里设置组件的默认props配置项, 在下面的 props 方法里面设置无效
      props: {},
      $required: false,
    }
  },
  // 拖拽组件配置项(props)的生成规则
  props() {
    return [
      {
        type: 'Required', field: 'formCreate$required', title: '是否必填',
      },
      { type: 'switch', field: 'disabled', title: '是否禁用' }]
  },
}
