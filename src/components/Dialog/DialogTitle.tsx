interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export default function DialogTitle(props: Props) {
  const { children, className, ...rest } = props;

  const dialogTitleClassName = `whitespace-nowrap text-lg font-semibold leading-none tracking-tight ${
    className ? className : ""
  }`;

  return (
    <h2 className={dialogTitleClassName} {...rest}>
      {children}
    </h2>
  );
}
