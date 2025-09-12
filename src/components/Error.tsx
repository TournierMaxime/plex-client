import React from "react"

export type ErrorProps = {
  message: string
  status?: number
}

export default function Error({ error }: { error: ErrorProps }) {
  return (
    <div style={{ color: "red", padding: "1em" }}>
      {error?.message} ({error?.status})
    </div>
  )
}
