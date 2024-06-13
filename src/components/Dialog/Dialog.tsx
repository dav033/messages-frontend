"use client";

import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog(props: Props) {
  const { open, onClose, children, className, ...rest } = props;

  const dialogClassName = `bg-white z-50 grid gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-full max-w-md ${
    className ? className : ""
  }`;

  const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    open && (
      <div
        className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-65"
        onClick={onClose}
      >
        <div className={dialogClassName} onClick={handleDialogClick} {...rest}>
          {children}
        </div>
      </div>
    )
  );
}
