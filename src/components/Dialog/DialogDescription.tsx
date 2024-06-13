interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export default function DialogDescription(props: Props) {
  const { children, className, ...rest } = props;

  const dialogDescriptionClassName = `text-sm text-muted-foreground text-zinc-500`;

  return (
    <p className={dialogDescriptionClassName} {...rest}>
      {children}
    </p>
  );
}
