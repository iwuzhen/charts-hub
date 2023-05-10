import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

export const alovaChartInstance = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  responded: response => response.json(),
})

export const alovaInstance = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  // responded: response => response.json(),
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为请求的配置，它用于同步请求前后的配置信息
    onSuccess: async (response, config) => {
      if (response.status >= 400)
        throw new Error(response.statusText)

      const json = await response.json()
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message)
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return json.data
    },

  },
})

export function GetChartInfoBatch(page = 1, pageSize = 20) {
  return alovaInstance.Get< {
    data: ChartInfoModel[]
    page: number
    pageSize: number
    total: number
  } >('https://api.nikepai.com:10444/v/3.0/api/chart/info/list', {
    params: {
      page,
      pageSize,
    },
  })
}

export function PutChartInfo(chartInfoMode: ChartInfoModel) {
  return alovaInstance.Put('https://api.nikepai.com:10444/v/3.0/api/chart/info', chartInfoMode,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  )
}

export function GetChartInfo(path: string) {
  return alovaInstance.Get<ChartInfoModel>('https://api.nikepai.com:10444/v/3.0/api/chart/info',
    {
      params: {
        path,
      },
    },
  )
}

export function GetChartInfoPaths() {
  return alovaInstance.Get<string[]>('https://api.nikepai.com:10444/v/3.0/api/chart/info/paths',
  )
}

export function DeleteChartInfo(chartInfoMode: ChartInfoModel) {
  return alovaInstance.Delete<any>('https://api.nikepai.com:10444/v/3.0/api/chart/info', '',
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      params: { ID: chartInfoMode.id, path: chartInfoMode.path },
    },
  )
}

export function GetChartDocumentBatch(page = 1, pageSize = 20) {
  return alovaInstance.Get< {
    data: ChartDocumentModel[]
    page: number
    pageSize: number
    total: number
  } >('https://api.nikepai.com:10444/v/3.0/api/chart/document/list', {
    params: {
      page,
      pageSize,
    },
  })
}

export function PutChartDocument(chartDocumentMode: ChartDocumentModel) {
  return alovaInstance.Put('https://api.nikepai.com:10444/v/3.0/api/chart/document', chartDocumentMode,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  )
}

export function GetChartDocument(path: string) {
  return alovaInstance.Get<ChartDocumentModel>('https://api.nikepai.com:10444/v/3.0/api/chart/document',
    {
      params: {
        path,
      },
    },
  )
}

export function GetChartDocumentPaths() {
  return alovaInstance.Get<string[]>('https://api.nikepai.com:10444/v/3.0/api/chart/document/paths',
  )
}

export function DeleteChartDocument(chartDocumentMode: ChartDocumentModel) {
  return alovaInstance.Delete<any>('https://api.nikepai.com:10444/v/3.0/api/chart/document', '',
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      params: { ID: chartDocumentMode.id, path: chartDocumentMode.path },
    },
  )
}
