interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea(props: Props) {
  const { label, className, ...rest } = props;

  const textareaClassName = `flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-slate-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;

  return (
    <div className="flex flex-col space-y-2 ml-1">
      {label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <textarea
        id={rest.id}
        name={rest.id}
        placeholder={rest.placeholder}
        className={`${textareaClassName} ${className ? className : ""}`}
        {...rest}
      />
    </div>
  );
}
