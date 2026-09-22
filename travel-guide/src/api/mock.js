// 模拟接口层:返回 Promise,接口形态贴近真实后端
// 替换为真实接口时,只需把函数体改成 axios 调用即可
import attractions from '../data/attractions.json'

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

export const CATEGORIES = [
  { value: 'all', label: '全部', icon: '🌐' },
  { value: 'royal', label: '皇家古建', icon: '🏯' },
  { value: 'modern', label: '现代地标', icon: '🏟' },
  { value: 'culture', label: '文化街区', icon: '🏮' },
  { value: 'nature', label: '自然风光', icon: '🌳' }
]

export const REGIONS = [
  '东城区', '西城区', '海淀区', '朝阳区', '延庆区', '怀柔区', '昌平区', '丰台区'
]

export function getCategoryLabel(category) {
  const item = CATEGORIES.find((c) => c.value === category)
  return item ? item.label : category
}

export async function getAllAttractions() {
  await delay()
  return [...attractions]
}

export async function getAttractionById(id) {
  await delay()
  const found = attractions.find((a) => a.id === Number(id))
  return found ? { ...found } : null
}

export async function getAttractionsByCategory(category) {
  await delay()
  if (!category || category === 'all') return [...attractions]
  return attractions.filter((a) => a.category === category)
}

export async function getRecommendedAttractions(limit = 5) {
  await delay()
  return attractions.filter((a) => a.recommended).slice(0, limit)
}

export async function searchAttractions(keyword) {
  await delay(100)
  const kw = String(keyword || '').trim().toLowerCase()
  if (!kw) return []
  return attractions.filter((a) => {
    return (
      a.name.toLowerCase().includes(kw) ||
      (a.nameEn && a.nameEn.toLowerCase().includes(kw)) ||
      a.tags.some((t) => t.toLowerCase().includes(kw)) ||
      (a.region && a.region.toLowerCase().includes(kw))
    )
  })
}