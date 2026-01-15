// 공통 타입 정의

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

// 환경 변수 타입 정의
export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENV: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
