interface Props {
  sender: string;
  user_id: string;
  sender_name: string;
  differentUser: boolean;
}

export default function UserName(props: Props) {
  const { user_id, sender, sender_name, differentUser } = props;
  return (
    <span className="text-xs absolute top-1 left-2 text-red-400 cursor-pointer">
      {differentUser ? (sender != user_id ? sender_name : "") : ""}
    </span>
  );
}
