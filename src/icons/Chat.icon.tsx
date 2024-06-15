import { SVGProps } from "react";

export function Chat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M7.5 12h6m-6-4h3m-2 12c1.05.87 2.315 1.424 3.764 1.519c1.141.075 2.333.075 3.473 0a4 4 0 0 0 1.188-.268c.41-.167.614-.25.719-.237c.104.012.255.122.557.342c.533.388 1.204.666 2.2.643c.503-.012.755-.019.867-.208c.113-.19-.027-.452-.308-.977c-.39-.728-.636-1.561-.262-2.229c.643-.954 1.19-2.083 1.27-3.303c.043-.655.043-1.334 0-1.99A6.7 6.7 0 0 0 21.4 11"></path>
        <path d="M12.345 17.487c3.556-.234 6.388-3.08 6.62-6.653c.046-.699.046-1.423 0-2.122c-.232-3.572-3.064-6.418-6.62-6.652c-1.213-.08-2.48-.08-3.69 0c-3.556.234-6.388 3.08-6.62 6.652c-.046.7-.046 1.423 0 2.122c.084 1.302.665 2.506 1.349 3.524c.397.712.135 1.6-.279 2.377c-.298.56-.447.84-.327 1.042s.387.209.922.221c1.057.026 1.77-.271 2.336-.685c.321-.234.482-.351.593-.365c.11-.013.328.075.763.253c.392.16.846.258 1.263.286c1.21.08 2.477.08 3.69 0"></path>
      </g>
    </svg>
  );
}