interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  accent?: boolean;
}

export default function Input(props: Props) {
  const { label, className, ...rest } = props;

  let inputClassName = `flex h-10 mb-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-slate-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;

  if (props.accent) {
    //desabilitar el ring
    inputClassName += " border-gray-400 focus-visible:ring-0";
  }

  return (
    <div className="flex flex-col space-y-2 ml-1 mb-2 w-full">
      {label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <input
        id={rest.id}
        name={rest.id}
        className={`${inputClassName} ${className ? className : ""}`}
        {...rest}
      />
    </div>
  );
}
