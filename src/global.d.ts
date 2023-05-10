interface ChartInfoModel {
  id?: number
  title: string
  path: string
  version: string
  tags: Array<string>|string
  description: string
  form_schema: string
  form_handler: string
  extra_data: Record<string, any>
  create_time?: Date
}

interface ChartDocumentModel {
  id?: number
  path: string
  title?: string
  version: string
  document: string
  extra_data?: Record<string, any>
  create_time?: Date
}

// interface FormConfigModel {
//   form_schema: Record<string, any>
//   form_handler: str
// }
