import { Box } from "@mui/material"

export default function Loading() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "2em",
      }}
    >
      Loading...
    </Box>
  )
}
