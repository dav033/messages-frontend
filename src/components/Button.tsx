"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "filled" | "outlined" | "text";
  color?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    className: customClassName,
    disabled,
    type = "button",
    variant = "text",
    color = "default",
    ...rest
  } = props;

  const colorVariantsFilled = {
    default:
      "bg-default-button text-default-button-foreground hover:bg-default-button-dark",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  };

  let buttonClasses = `inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2`;

  if (variant === "filled") {
    buttonClasses += ` ${colorVariantsFilled[color]}`;
  } else if (variant === "outlined") {
    buttonClasses += ` border border-${color} border-${color}-800 text-${color}-500 hover:bg-${color}-400`;
  } else if (variant === "text") {
    buttonClasses += ` text-${color}-500 hover:bg-${color}-100`;
  }

  if (customClassName) {
    buttonClasses += ` ${customClassName}`;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses.trim()}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
