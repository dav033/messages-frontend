interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DialogFooter(props: Props) {
  const { children, className, ...rest } = props;

  const dialogFooterClassName = `flex justify-end gap-2 mt-4`;

  return (
    <div className={dialogFooterClassName} {...rest}>
      {children}
    </div>
  );
}
