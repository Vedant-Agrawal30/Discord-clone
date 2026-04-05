import { useEffect, useState, RefObject } from "react";

type ChatScrollProps = {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  loadMore: () => void;
  shouldLoadMore: boolean;
  count: number; // TOTAL messages count
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  loadMore,
  shouldLoadMore,
  count,
}: ChatScrollProps) => {
  const [initialized, setInitialized] = useState(false);

  // 🔼 Load previous messages when scrolled to top
  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const onScroll = () => {
      if (chat.scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    chat.addEventListener("scroll", onScroll);
    return () => chat.removeEventListener("scroll", onScroll);
  }, [chatRef, loadMore, shouldLoadMore]);

  // 🔽 Auto scroll on NEW messages
  useEffect(() => {
    const chat = chatRef.current;
    const bottom = bottomRef.current;
    if (!chat || !bottom) return;

    const distanceFromBottom =
      chat.scrollHeight - chat.scrollTop - chat.clientHeight;

    // first render → always scroll
    if (!initialized) {
      bottom.scrollIntoView();
      setInitialized(true);
      return;
    }
    console.log("Distance from bottom:", distanceFromBottom);
    // user is near bottom → auto scroll
    if (distanceFromBottom < 120) {
      bottom.scrollIntoView({ behavior: "smooth" });
    }
  }, [count, chatRef, bottomRef, initialized]);
};
