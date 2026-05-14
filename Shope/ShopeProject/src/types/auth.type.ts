import type { SuccessResponse } from './utils.type'
import type { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
