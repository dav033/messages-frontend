import { ArrowBack } from "@/icons/ArrowBack";
import Button from "../Button";

export default function BackButton({
  clearStates,
}: {
  clearStates: () => void;
}) {
  return (
    <Button className="text-black w-2 bg-red-" onClick={clearStates}>
      <ArrowBack className="fill-black text-black color-black text-xl " />
    </Button>
  );
}
