import { createContext, useContext, useReducer } from "react"

type PaginationState = {
  count: number
  page: number
  offset: number
  limit: number
  rowsPerPageOptions: number[]
}

type PaginationAction =
  | { type: "SET_OFFSET"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "RESET" }

type PaginationContextType = PaginationState & {
  count: number
  page: number
  offset: number
  limit: number
  rowsPerPageOptions: number[]
  reset: () => void
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaginationContext = createContext<PaginationContextType | null>(null)

const initialState: PaginationState = {
  count: 0,
  page: 1,
  offset: 0,
  limit: 10,
  rowsPerPageOptions: [10, 25, 50, 100],
}

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case "SET_OFFSET":
      return { ...state, offset: action.payload }
    case "SET_LIMIT":
      return { ...state, limit: action.payload }
    case "RESET":
      return {
        ...state,
        offset: 0,
        limit: 0,
        page: 1,
      }
    default:
      return state
  }
}

export default function PaginationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(paginationReducer, initialState)

  const reset = () => dispatch({ type: "RESET" })

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch({ type: "SET_OFFSET", payload: newPage * state.limit })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10)
    dispatch({ type: "SET_LIMIT", payload: newLimit })
    dispatch({ type: "SET_OFFSET", payload: 0 })
  }

  state.page = Math.floor(state.offset / state.limit)

  return (
    <PaginationContext.Provider
      value={{ ...state, reset, handleChangePage, handleChangeRowsPerPage }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error("usePagination must be used within PaginationProvider")
  }
  return context
}
