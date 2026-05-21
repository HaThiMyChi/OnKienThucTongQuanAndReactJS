import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  // chuyển query params trên URL thành object thường
  // [...searchParams] nó biến searchParams thành mảng key-value

  return Object.fromEntries([...searchParams])
}
