// import formCreate from '@form-create/element-ui'
// import autoInstall from '@form-create/element-ui/auto-import'

// import FcDesigner from '@form-create/designer'
import ElementPlus from 'element-plus'
import { type UserModule } from '~/types'

import 'element-plus/dist/index.css'
import VForm3 from '@/../lib/vform/designer.umd.js' // 引入VForm3样式
import '@/../lib/vform/designer.style.css' // 引入VForm3样式
// import VForm3Render from '@/../lib/vform/render.umd.js' // 引入VForm3样式
// import '@/../lib/vform/render.style.css' // 引入VForm3样式
// main.ts

// https://www.naiveui.com/zh-CN/light/docs/fonts
export const install: UserModule = ({ app }) => {
  // formCreate.use(autoInstall)
  app.use(ElementPlus)
  app.use(VForm3)

  // app.use(VForm3Render)
  // app.use(formCreate)
  // app.use(FcDesigner)
}
