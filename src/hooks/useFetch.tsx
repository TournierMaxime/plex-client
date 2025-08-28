import { AxiosError } from "axios"
import { useState } from "react"

export type Error = {
  message: string
  status?: number
}

const useFetch = <T,>() => {
  const [data, setData] = useState<T | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const fetchData = async (service: Promise<T>) => {
    setIsLoading(true)
    setError(undefined)

    try {
      const response = await service
      setData(response)
    } catch (err: unknown) {
      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError
        setError({
          message: axiosError.message,
          status: axiosError.response?.status,
        })
      } else {
        setError({
          message: "Une erreur inconnue est survenue.",
          status: 0,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchError = () => (
    <div style={{ color: "red", padding: "1em" }}>
      {error?.message} ({error?.status})
    </div>
  )

  return {
    data,
    isLoading,
    error,
    fetchData,
    fetchError,
  }
}

export default useFetch
