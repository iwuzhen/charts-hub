import formulaModule from '@wangeditor/plugin-formula'
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import { type UserModule } from '~/types'

// https://www.naiveui.com/zh-CN/light/docs/fonts
export const install: UserModule = () => {
  // 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
  Boot.registerModule(formulaModule)
  Boot.registerModule(markdownModule)
}
