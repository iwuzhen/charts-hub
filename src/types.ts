import { type ViteSSGContext } from 'vite-ssg'

import type { SlateDescendant } from '@wangeditor/editor'

export type UserModule = (ctx: ViteSSGContext) => void

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}
