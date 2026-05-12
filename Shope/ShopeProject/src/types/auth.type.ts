import type { ResponseApi } from './utils.type'
import type { User } from './user.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
