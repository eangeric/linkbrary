type ModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  children?: React.ReactNode;
};

export default function Dialog({ dialogRef, children }: ModalProps) {
  return (
    <dialog ref={dialogRef} className="backdrop:bg-black/20">
      {children}
    </dialog>
  );
}
