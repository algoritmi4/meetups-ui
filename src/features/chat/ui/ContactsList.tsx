import { ContactCard } from "@/entities/chat/chatContact";
import { IContact } from "@/entities/chat/chatContact/model/types";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { ReactElement, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { rooms } from "../model/contants";

function ContactsList(): ReactElement {
  const [a, setA] = useState<IContact[]>(rooms);

  const b = [{
    img: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    lastMessage: 'Привет, как дела?',
    lastMessageDate: '1 марта',
    messagesQuant: 1
  },
  {
    img: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    lastMessage: 'Привет, как дела?',
    lastMessageDate: '1 марта',
    messagesQuant: 1
  },
  {
    img: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    lastMessage: 'Привет, как дела?',
    lastMessageDate: '1 марта',
    messagesQuant: 1
  }]

  const handleNext = () => {
    setA((state) => [...state, ...b]);
  }

  return (
    <div className="max-w-[479px] w-full h-[569px] border-r-3 border-r-solid border-r-custom-gray pr-[45px]">
      <Input
        type="search"
        size="lg"
        head={<Svg id="search-icon-def" className="w-6 h-6"/>}
        placeholder="Ищите переписки"
        extraInputClass="pl-3 placeholder:!text-placeholder-gray"
      />
      <InfiniteScroll
        className="flex flex-col gap-3.5 mt-[30px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]"
        dataLength={a.length}
        next={handleNext}
        hasMore={true}
        loader={<p>Loading...</p>}
        height={406}
      >
        {a.map((el, index) => <ContactCard key={index} data={el} />)}
      </InfiniteScroll>
    </div>
  )
}

export default ContactsList;
