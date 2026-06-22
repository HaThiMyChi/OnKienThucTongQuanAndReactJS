import type { User } from '../types/user.type'
import type { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

// Tác dụng:

// Lấy tất cả các thuộc tính từ User
// Loại bỏ đi những thuộc tính: _id, roles, createdAt, updatedAt, email
// Tại sao cần làm thế:

// _id, createdAt, updatedAt → Do server quản lý, user không được thay đổi
// roles → Quyền hạn người dùng, không được user tự đặt
// email → Thay đổi email cần xác nhận, không update trực tiếp
// Ngoài ra, BodyUpdateProfile thêm password và newPassword để xử lý đổi mật khẩu

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
