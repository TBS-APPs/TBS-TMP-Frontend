"use client";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";
import { useDialog } from "./dialog-context";
// import { forwardRef, JSXElementConstructor } from "react";
import { useTranslations } from "next-intl";

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<
//       unknown,
//       string | JSXElementConstructor<unknown>
//     >;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function DialogSlide() {
  const t = useTranslations();
  const { isOpen, hide, options } = useDialog();

  function handleClose() {
    hide();
    if (options?.onCancel) {
      options.onCancel();
    }
  }

  function handleConfirm() {
    hide();
    if (options?.onConfirm) {
      options.onConfirm();
    }
  }

  return (
    <h1>Dialog</h1>
    // <Dialog
    //   open={isOpen}
    //   slots={{
    //     transition: Transition,
    //   }}
    //   keepMounted
    //   onClose={handleClose}
    //   aria-describedby="dialog-slide-description"
    // >
    //   {options?.title && <DialogTitle>{options.title}</DialogTitle>}
    //   {options?.content && <DialogContent>{options.content}</DialogContent>}

    //   <DialogActions>
    //     {options?.showCancelButton && (
    //       <Button onClick={handleClose}>{t("cancel")}</Button>
    //     )}

    //     <Button onClick={handleConfirm}>
    //       {options?.confirmText || t("okay")}
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
}
