import { TableCell } from "@mui/material"

export default function Cell({ children }: { children: React.ReactNode }) {
  return <TableCell sx={{ fontSize: "1em" }}>{children}</TableCell>
}
