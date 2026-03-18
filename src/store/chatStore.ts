import { create } from 'zustand'
import { ChatMessage } from '@/types'

interface ChatStore {
  messages: ChatMessage[]
  conversationId: string | null
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
  setConversationId: (id: string | null) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  conversationId: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [], conversationId: null }),
  setConversationId: (id) => set({ conversationId: id }),
}))
