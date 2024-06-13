interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DialogHeader(props: Props) {
  const { children, className, ...rest } = props;

  const dialogHeaderClassName = `flex flex-col space-y-1.5 text-center sm:text-left ${
    className ? className : ""
  }`;

  return (
    <div className={dialogHeaderClassName} {...rest}>
      {children}
    </div>
  );
}
