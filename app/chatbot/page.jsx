import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatInterface from "@/components/chat-interface"
import '../globals.css'
export default function Chatbot() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-foreground">Investment Assistant</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground">Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatInterface />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground">Solution Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our AI assistant uses advanced natural language processing to understand your investment queries and
              provide personalized recommendations.
            </p>
            <div className="rounded-md bg-muted p-4">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Ask questions about your portfolio</li>
                <li>Get market insights and analysis</li>
                <li>Receive personalized investment advice</li>
                <li>Learn about investment strategies</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

