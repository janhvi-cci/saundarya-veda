import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, Send, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  chatbotSuggestions,
  getChatbotResponse,
  type ChatbotAction,
} from '@/data/chatbotKnowledge';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  actions?: ChatbotAction[];
}

const introduction: Message = {
  id: 1,
  role: 'assistant',
  text: "Hello! I'm the Saundarya Veda Assistant 🌸\n\nI can help you explore our beauty & cosmetic ingredients, understand their applications, discover suitable ingredients for different formulations, and guide you through samples, quotes and B2B enquiries.\n\nWhat would you like to explore?",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([introduction]);
  const [nextId, setNextId] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    const response = getChatbotResponse(trimmed);

    setMessages((current) => [
      ...current,
      {
        id: nextId,
        role: 'user',
        text: trimmed,
      },
      {
        id: nextId + 1,
        role: 'assistant',
        text: response.text,
        actions: response.actions,
      },
    ]);

    setNextId((current) => current + 2);
    setInput('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {isOpen && (
        <div
          className="
            fixed bottom-24 right-4 z-50
            flex w-[calc(100vw-2rem)] max-w-[390px]
            origin-bottom-right animate-fade-up
            flex-col overflow-hidden rounded-2xl
            border border-brand-pink/50
            bg-white text-brand-charcoal
            shadow-[0_24px_70px_rgba(41,35,38,0.2)]
            dark:border-brand-pink/30
            dark:bg-[#211A1D]
            dark:text-white
            sm:right-6
          "
        >
          {/* HEADER */}
          <div
            className="
              flex items-center justify-between
              bg-brand-pink-light px-4 py-3.5
              dark:bg-[#2a2023]
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-brand-pink-deep
                  text-brand-charcoal
                "
              >
                <Sparkles className="h-4 w-4" />
              </span>

              <div>
                <p className="text-sm font-semibold text-brand-charcoal dark:text-white">
                  Assistant
                </p>

                <p className="text-[11px] text-brand-text-secondary dark:text-gray-300">
                  Saundarya Veda · local knowledge
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close ingredient assistant"
              className="
                rounded-full p-1.5
                text-brand-text-secondary
                hover:bg-white/70
                hover:text-brand-charcoal
                dark:text-gray-300
                dark:hover:bg-[#171315]
                dark:hover:text-white
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* MESSAGES */}
          <div
            className="
              flex max-h-[min(58vh,470px)] min-h-[300px]
              flex-col gap-3 overflow-y-auto
              bg-white px-3 py-4
              text-brand-charcoal
              dark:bg-[#171315]
              dark:text-white
            "
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`
                    max-w-[88%]
                    ${
                      message.role === 'user'
                        ? `
                          rounded-2xl rounded-br-sm
                          bg-brand-pink-deep
                          px-3.5 py-2.5
                          text-brand-charcoal
                        `
                        : `
                          rounded-2xl rounded-bl-sm
                          border border-brand-pink/30
                          bg-brand-pink-light
                          px-3.5 py-3
                          text-brand-charcoal
                          dark:bg-[#2a2023]
                          dark:text-white
                        `
                    }
                  `}
                >
                  <p className="whitespace-pre-line text-[13px] leading-relaxed">
                    {message.text}
                  </p>

                  {message.actions &&
                    message.actions.length > 0 && (
                      <div
                        className="
                          mt-3 flex flex-wrap gap-1.5
                          border-t border-brand-pink/30
                          pt-2.5
                        "
                      >
                        {message.actions.map((action) => (
                          <Link
                            key={action.to}
                            to={action.to}
                            onClick={() => setIsOpen(false)}
                            className="
                              inline-flex items-center
                              rounded-full
                              border border-brand-pink-deep/40
                              bg-white
                              px-2.5 py-1.5
                              text-[11px] font-semibold
                              text-brand-pink-deep
                              hover:bg-brand-pink-light

                              dark:border-brand-pink/40
                              dark:bg-[#171315]
                              dark:text-brand-pink
                              dark:hover:bg-[#211A1D]
                            "
                          >
                            {action.label}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTIONS */}
          {messages.length === 1 && (
            <div
              className="
                flex gap-2 overflow-x-auto
                border-t border-brand-pink/30
                bg-white px-3 py-2.5
                dark:bg-[#211A1D]
              "
            >
              {chatbotSuggestions.slice(0, 4).map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="
                    shrink-0 rounded-full
                    border border-brand-pink/50
                    bg-white
                    px-2.5 py-1.5
                    text-[11px]
                    text-brand-charcoal
                    hover:border-brand-pink-deep
                    hover:text-brand-pink-deep

                    dark:border-brand-pink/40
                    dark:bg-[#2a2023]
                    dark:text-gray-100
                    dark:hover:border-brand-pink
                    dark:hover:text-brand-pink
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <form
            onSubmit={handleSubmit}
            className="
              flex items-center gap-2
              border-t border-brand-pink/30
              bg-white p-3
              dark:bg-[#211A1D]
            "
          >
            <label
              htmlFor="ingredient-assistant-input"
              className="sr-only"
            >
              Ask the ingredient assistant
            </label>

            <input
              id="ingredient-assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about an ingredient..."
              className="
                min-w-0 flex-1
                rounded-full
                border border-brand-pink/50
                bg-brand-pink-light
                px-3.5 py-2.5
                text-xs
                text-brand-charcoal
                placeholder:text-brand-text-secondary
                focus:border-brand-pink-deep
                focus:outline-none

                dark:border-brand-pink/40
                dark:bg-[#171315]
                dark:text-white
                dark:placeholder:text-gray-400
              "
            />

            <button
              type="submit"
              aria-label="Send message"
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                bg-brand-pink-deep
                text-brand-charcoal
                hover:shadow-md
              "
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING CHAT BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen
            ? 'Close ingredient assistant'
            : 'Open ingredient assistant'
        }
        aria-expanded={isOpen}
        className="
          fixed bottom-5 right-4 z-50
          flex items-center gap-2
          rounded-full
          border border-white/70
          bg-brand-pink-deep
          px-4 py-3
          text-sm font-semibold
          text-brand-charcoal
          shadow-[0_10px_30px_rgba(217,154,174,0.35)]
          hover:-translate-y-0.5
          hover:shadow-lg
          sm:right-6
        "
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <Bot className="h-5 w-5" />
        )}

        <span className="hidden sm:inline">
          Ingredient Assistant
        </span>
      </button>
    </>
  );
}