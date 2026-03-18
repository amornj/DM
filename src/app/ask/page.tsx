'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Volume2, VolumeX, RefreshCw, MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChatStore } from '@/store/chatStore'
import { ChatMessage } from '@/types'

export default function AskPage() {
  const { messages, conversationId, addMessage, clearMessages, setConversationId } = useChatStore()
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'brief' | 'explanatory'>('brief')
  const [loading, setLoading] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function stopSpeaking() {
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
  }

  function toggleSpeak(msg: ChatMessage) {
    if (speakingId === msg.id) {
      stopSpeaking()
      return
    }
    stopSpeaking()
    const utterance = new SpeechSynthesisUtterance(msg.content)
    utterance.rate = 0.95
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)
    setSpeakingId(msg.id)
    window.speechSynthesis.speak(utterance)
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const question = input.trim()
    if (!question || loading) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      mode,
      timestamp: Date.now(),
    }
    addMessage(userMsg)
    setInput('')
    setLoading(true)
    stopSpeaking()

    try {
      const res = await fetch('/api/notebooklm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, conversationId, mode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')

      if (data.conversationId) setConversationId(data.conversationId)

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer || '(No answer returned)',
        mode,
        timestamp: Date.now(),
      }
      addMessage(assistantMsg)
    } catch (err) {
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Failed to get response'}`,
        mode,
        timestamp: Date.now(),
      }
      addMessage(errMsg)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleClear() {
    stopSpeaking()
    clearMessages()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Ask NotebookLM</h1>
          <p className="text-sm text-gray-500 mt-0.5">AACE 2026 T2D guideline Q&A</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw size={13} />
          Clear
        </button>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1.5 mb-3">
        {(['brief', 'explanatory'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors border ${
              mode === m
                ? 'border-[#0d6e6e] bg-[#e6f4f4] text-[#0d6e6e]'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            {m === 'brief' ? 'Brief' : 'Explanatory'}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 pb-2">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-12">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#e6f4f4' }}>
              <MessageCircle size={24} style={{ color: '#0d6e6e' }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">Ask about T2D management</div>
              <div className="text-xs text-gray-400 mt-1 max-w-xs">
                Queries answered from the AACE 2026 clinical guideline notebook.
              </div>
            </div>
            <div className="space-y-1.5 w-full max-w-xs">
              {[
                'What are the first-line drugs for T2D with ASCVD?',
                'When should I use SGLT2i vs GLP-1 RA?',
                'How do I titrate basal insulin?',
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="w-full text-left text-xs bg-white border border-gray-200 hover:border-[#0d6e6e] hover:bg-[#e6f4f4] rounded-lg px-3 py-2 transition-colors text-gray-600"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-sm'
              }`}
              style={msg.role === 'user' ? { backgroundColor: '#0d6e6e' } : {}}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-gray-900">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <span>{msg.content}</span>
              )}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => toggleSpeak(msg)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                >
                  {speakingId === msg.id ? (
                    <VolumeX size={13} className="text-[#0d6e6e]" />
                  ) : (
                    <Volume2 size={13} className="text-gray-400 hover:text-[#0d6e6e]" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#0d6e6e', animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#0d6e6e', animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#0d6e6e', animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-3 border-t border-gray-100">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about T2D management..."
          rows={1}
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30 resize-none overflow-hidden leading-relaxed"
          style={{ minHeight: '42px', maxHeight: '120px' }}
          onInput={e => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = `${el.scrollHeight}px`
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40"
          style={{ backgroundColor: '#0d6e6e' }}
        >
          <Send size={16} color="white" />
        </button>
      </form>
    </div>
  )
}
