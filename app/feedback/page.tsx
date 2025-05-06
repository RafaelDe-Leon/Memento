import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, ThumbsUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import StarRating from "@/components/star-rating"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            We Value Your Feedback
          </h1>
          <p className="text-muted-foreground mb-8">
            Your input helps us improve Memento during this beta phase. Please share your thoughts and suggestions.
          </p>

          <div className="mb-6">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card className="border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Beta Feedback Form
              </CardTitle>
              <CardDescription>
                Tell us about your experience with Memento and how we can make it better for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select>
                  <SelectTrigger id="feedback-type" className="bg-muted/50 border-primary/20 focus:ring-primary/30">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="usability">Usability Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Overall Experience</Label>
                <StarRating />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-message">Your Feedback</Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                  rows={6}
                  className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <Label>Which features did you find most useful?</Label>
                <RadioGroup defaultValue="note-generation">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="note-generation" id="note-generation" />
                    <Label htmlFor="note-generation">Note Generation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="templates" id="templates" />
                    <Label htmlFor="templates">Template Shortcuts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interface" id="interface" />
                    <Label htmlFor="interface">User Interface</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-feature" />
                    <Label htmlFor="other-feature">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email for follow-up questions"
                  className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  We'll only use your email to follow up on your feedback if needed.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="py-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Memento. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
