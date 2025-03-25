"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import { Bot, Send, User } from "lucide-react"
import { useState } from "react"

const initialMessages = [
  {
    id: 1,
    content: "Hello! I'm your investment assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { 
      id: messages.length + 1,
      sender: "user",
      content: input,
      timestamp: new Date()
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        { prompt: userMessage.content },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data
      
      const formattedContent = formatResponse(data.chat_response)
      
      setMessages((prev) => [
        ...prev, 
        { 
          id: prev.length + 1,
          sender: "assistant",
          content: formattedContent,
          timestamp: new Date()
        }
      ])
    } 
    catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          id: prev.length + 1,
          sender: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatResponse = (text) => {
    return text.replace(/\d+\.\s\*\*(.*?)\*\*/g, "<strong>$1</strong>")
               .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
               .replace(/\n/g, "<br />");
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={message.sender === "user" ? "bg-primary" : "bg-muted"}>
                  <AvatarFallback>
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="bg-muted">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask about your investments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}