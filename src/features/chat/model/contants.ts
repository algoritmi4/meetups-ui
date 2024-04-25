import { IContact } from "@/entities/chat/chatContact/model/types";
import { IRoomInfo } from "./types";

// mock
export const roomInfo: IRoomInfo = {
  "chat_id": 1,
  "type": "chat",
  "participants": [
    {
      "user_id": 1,
      "username": "test_user Ivan Butorin",
      "image_url": "www.example.com"
    },
    {
      "user_id": 2,
      "username": "test_user_2",
      "image_url": "www.example.com"
    }
  ],
  "messages": [
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-25T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-25T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z"
    },
    {
      "message_id": 1,
      "sender_id": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z"
    },
    {
      "message_id": 2,
      "sender_id": 2,
      "message_text": "U too!!",
      "created_at": "2024-04-25T17:57:01Z"
    },
  ]
}

// mock-data
export const rooms: IContact[] = [
  {
    img: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин Владимирович',
    lastMessage: 'Привет, как дела? Пойдешь в следующую пятницу на концерт Моргенштерна?',
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
  },
  {
    img: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    lastMessage: 'Привет, как дела?',
    lastMessageDate: '1 марта',
    messagesQuant: 1
  }
]
