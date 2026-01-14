import axios from 'axios'

// API 기본 URL 설정 (환경 변수로 관리 가능)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 401 Unauthorized - 토큰 만료 또는 인증 실패
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 로그인 페이지로 리다이렉트 (필요시)
      // window.location.href = '/login'
    }
    
    // 403 Forbidden
    if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다.')
    }
    
    // 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('서버 오류가 발생했습니다.')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
