import axios from 'axios'
import { useState } from 'react'

export default function useRequest({
  method,
  url,
  body,
}: {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  body?: any
}) {
  const [errors, setErrors] = useState<any>(null)

  const doRequest = async () => {
    try {
      setErrors([])
      const response = await axios[method](url, body)
      return response
    } catch (error) {
      setErrors(error?.response?.data?.errors)
      throw errors
    }
  }

  return { doRequest, errors }
}
