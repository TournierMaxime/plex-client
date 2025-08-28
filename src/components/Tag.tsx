import { Chip } from "@mui/material"

export default function Tag({ label }: { label: string }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{ marginRight: "0.5em", fontSize: "1em" }}
    />
  )
}
