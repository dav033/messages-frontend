export default function UnreadedMessages(props: { unreadedMessages: number }) {
  const { unreadedMessages } = props;

  if (unreadedMessages === 0) return null;
  return (
    <span className="ml-auto mr-0 rounded-full bg-sky-500 py-1 px-2 text-xs">
      {unreadedMessages}
    </span>
  );
}
