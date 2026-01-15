import axiosInstance from '@/lib/axios'
import type { ApiResponse } from '@/types'
import type { AxiosRequestConfig } from 'axios'

/**
 * API 요청 유틸리티 함수들
 */

// GET 요청
export const get = async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, config)
  return response.data
}

// POST 요청
export const post = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.post<ApiResponse<T>>(url, data, config)
  return response.data
}

// PUT 요청
export const put = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.put<ApiResponse<T>>(url, data, config)
  return response.data
}

// PATCH 요청
export const patch = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config)
  return response.data
}

// DELETE 요청
export const del = async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.delete<ApiResponse<T>>(url, config)
  return response.data
}
