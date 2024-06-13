"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "filled" | "outlined" | "text";
  color?: "accent";
}

export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    className: customClassName,
    disabled,
    type = "button", // Default type to "button" if not provided
    variant = "text", // Default variant to "filled" if not provided
    color = "default", // Default color to "default" if not provided
    ...rest // Captura los props restantes
  } = props;

  const colorVariantsFilled = {
    default:
      "bg-default-button text-default-button-foreground hover:bg-default-button-dark",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  };

  let buttonClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2`;

  if (variant === "filled") {
    buttonClasses += ` ${colorVariantsFilled[color]}`;
  } else if (variant === "outlined") {
    buttonClasses += ` border border-${color}-500 text-${color}-500 hover:bg-${color}-100`;
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
      {...rest} // Propaga los props restantes
    >
      {children}
    </button>
  );
}
