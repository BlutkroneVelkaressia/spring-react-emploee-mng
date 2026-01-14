import { QueryClient } from '@tanstack/react-query'

// React Query 클라이언트 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 옵션 설정
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (이전 cacheTime)
      retry: 1, // 실패 시 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      refetchOnReconnect: true, // 네트워크 재연결 시 refetch
    },
    mutations: {
      // Mutation 기본 옵션
      retry: 0, // Mutation은 재시도하지 않음
    },
  },
})
