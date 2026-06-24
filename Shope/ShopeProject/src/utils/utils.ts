import axios, { AxiosError } from 'axios'

import HttpStatusCode from '../constants/httpStatusCode.enum'
import { string } from 'yup'
import config from '../constants/config'
import userImage from 'src/assets/images/user.svg'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member

  // Nếu hàm isAxiosError trả về true, thì error chính là AxiosError<T>.
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, scale: number) => Math.round(((original - scale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

// Đầu tiên, hàm removeSpecialCharacter(name) chạy trước để xóa hết các ký tự lằng nhằng như ! @ # $. Lúc này chuỗi chỉ còn lại chữ và khoảng trắng.
// Ngay sau đó, .replace(/\s/g, '-') sẽ nhảy vào, quét toàn bộ chuỗi, cứ chỗ nào trống (khoảng trắng) là nó đè ra thay bằng dấu gạch ngang (-).

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

// 1. Dùng .split('-i-') để cắt chuỗi NameId thành một mảng gồm 2 phần dựa vào ký tự mốc là -i-.
// 2. Trả về phần tử cuối cùng của mảng (arr[arr.length - 1]), chính là ID bạn cần.
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

// export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)

export const getAvatarUrl = (avatarName?: string | null) => {
  if (!avatarName) return userImage

  if (avatarName.startsWith('http')) {
    return avatarName
  }

  return `${config.baseUrl}images/${avatarName}`
}
