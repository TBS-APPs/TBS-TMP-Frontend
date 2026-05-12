"use client";

// import { Fade, Snackbar } from "@mui/material";
import { useSnackbar } from "./snack-bar-context";

export default function CustomSnackbar() {
  const { isOpen, options, hide } = useSnackbar();
  return (
    <h1>Snackbar</h1>
    // <Snackbar
    //   open={isOpen}
    //   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    //   onClose={hide}
    //   slots={{ transition: Fade }}
    //   autoHideDuration={
    //     options?.autoHide === false ? null : options?.autoHideDuration ?? 3000
    //   }
    //   message={options?.content}
    // />
  );
}
