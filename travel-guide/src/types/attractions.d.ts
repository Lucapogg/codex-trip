// attractions.d.ts
// Mock 景点数据类型定义,仅用于 IDE 类型提示,不参与运行时
// 数据来源:src/api/mock.js 与 src/data/attractions.json

export interface AttractionLocation {
  lat: number
  lng: number
}

export interface AttractionTransport {
  subway?: string
  bus?: string
}

export type AttractionCategory = 'royal' | 'modern' | 'culture' | 'nature'

export interface Attraction {
  id: number
  name: string
  nameEn?: string
  category: AttractionCategory
  region: string
  address: string
  location: AttractionLocation
  cover: string
  images: string[]
  rating: number
  tags: string[]
  openHours: string
  ticketPrice: string
  suggestedDuration: string
  transport: AttractionTransport
  description: string
  detail: string[]
  tips: string[]
  recommended: boolean
}

// 为 mock 数据 JSON 提供强类型导入(支持相对/绝对路径)
declare module '*/data/attractions.json' {
  const attractions: import('./attractions').Attraction[]
  export default attractions
}