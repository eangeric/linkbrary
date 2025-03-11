type ModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  children?: React.ReactNode;
};

export default function Dialog({ dialogRef, children }: ModalProps) {
  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/20 bg-transparent"
    >
      {children}
    </dialog>
  );
}
