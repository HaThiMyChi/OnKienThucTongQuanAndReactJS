import { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  data?: any
}

/**
 * Xử lý AxiosError và trả về thông tin lỗi chuẩn
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns ApiError object với message, status, data
 */
export const handleAxiosError = (error: any): ApiError => {
  // Kiểm tra nếu là AxiosError
  if (error.response) {
    // Server trả về response với status code ngoài range 2xx
    const status = error.response.status
    const data = error.response.data

    return {
      message: data?.message || `Lỗi ${status}`,
      status,
      data
    }
  } else if (error.request) {
    // Request được gửi nhưng không nhận được response
    return {
      message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
      status: 0,
      data: error.request
    }
  } else {
    // Lỗi khác (setup request, parser lỗi, v.v.)
    return {
      message: error.message || 'Có lỗi xảy ra',
      data: error
    }
  }
}

/**
 * Lấy error message từ AxiosError
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns Message string
 */
export const getErrorMessage = (error: any): string => {
  const apiError = handleAxiosError(error)
  return apiError.message
}

/**
 * Lấy status code từ AxiosError
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns Status code hoặc undefined
 */
export const getErrorStatus = (error: any): number | undefined => {
  const apiError = handleAxiosError(error)
  return apiError.status
}

/**
 * Check xem lỗi có phải 422 (Unprocessable Entity) không
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns boolean
 */
export const isValidationError = (error: any): boolean => {
  return getErrorStatus(error) === 422
}

/**
 * Check xem lỗi có phải unauthorized (401) không
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns boolean
 */
export const isAuthError = (error: any): boolean => {
  return getErrorStatus(error) === 401
}

/**
 * Check xem lỗi có phải forbidden (403) không
 * @param error - AxiosError hoặc Error bất kỳ
 * @returns boolean
 */
export const isForbiddenError = (error: any): boolean => {
  return getErrorStatus(error) === 403
}
