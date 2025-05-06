import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Info,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Help & Support - Memento",
  description: "Get help and support for Memento",
}

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Help & Support</h3>
        <p className="text-sm text-muted-foreground">
          Find answers to common questions or contact our support team for assistance.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for help articles..."
          className="pl-10 bg-muted/50 border-primary/20 focus:ring-primary/30"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Guides</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Contact</span>
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions about Memento.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I generate my first note?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To generate your first note:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Navigate to the Dashboard</li>
                      <li>Select a template or start from scratch</li>
                      <li>Fill in the required information</li>
                      <li>Click the "Generate Note" button</li>
                    </ol>
                    <div className="mt-3 p-3 bg-muted rounded-md">
                      <p className="text-sm flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Pro tip: Save templates you use frequently for quicker access!</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I customize templates?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">You can customize templates in a few ways:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Edit an existing template by clicking the "Edit" button</li>
                      <li>Create a new template from scratch in the Templates section</li>
                      <li>Duplicate and modify an existing template</li>
                    </ul>
                    <p className="mt-2">
                      All templates are fully customizable, including fields, default values, and formatting.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I change my subscription plan?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To change your subscription plan:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Go to Settings {"->"} Billing</li>
                      <li>Click on "Change Plan"</li>
                      <li>Select your new plan</li>
                      <li>Confirm the change</li>
                    </ol>
                    <p className="mt-2">
                      If you're upgrading, the change will take effect immediately. If you're downgrading, the change
                      will take effect at the end of your current billing cycle.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How secure is my data?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">We take data security very seriously:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All data is encrypted in transit and at rest</li>
                      <li>We use industry-standard security practices</li>
                      <li>We never share your data with third parties without your consent</li>
                      <li>Our platform is HIPAA compliant for healthcare professionals</li>
                    </ul>
                    <p className="mt-2">
                      You can read more about our security practices in our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Security Policy
                      </Link>
                      .
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I export my notes?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Yes, you can export your notes in several formats:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Plain text</li>
                      <li>PDF</li>
                      <li>Word document</li>
                      <li>HTML</li>
                    </ul>
                    <p className="mt-2">
                      To export a note, open it and click the "Export" button in the top-right corner.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/faq">
                  View All FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle>Guides & Documentation</CardTitle>
              <CardDescription>Learn how to use Memento with our comprehensive guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-primary/10 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Getting Started</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        Beginner
                      </Badge>
                    </div>
                    <CardDescription>Learn the basics of Memento</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>A complete introduction to Memento for new users.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
                      <Link href="#">
                        Read Guide
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Template Customization</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                      >
                        Intermediate
                      </Badge>
                    </div>
                    <CardDescription>Create and customize templates</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Learn how to create, edit, and manage custom templates.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
                      <Link href="#">
                        Read Guide
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Advanced Note Generation</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                      >
                        Advanced
                      </Badge>
                    </div>
                    <CardDescription>Master AI-powered note generation</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Advanced techniques for generating detailed professional notes.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
                      <Link href="#">
                        Read Guide
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Account Management</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        Beginner
                      </Badge>
                    </div>
                    <CardDescription>Manage your account settings</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Learn how to update your profile, billing, and preferences.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
                      <Link href="#">
                        Read Guide
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/guides">
                  Browse All Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team for assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Live Chat</h4>
                    <p className="text-sm text-muted-foreground mb-2">Chat with our support team in real-time.</p>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                    >
                      Available Now
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Send us an email and we'll respond within 24 hours.
                    </p>
                    <a href="mailto:support@memento.com" className="text-sm text-primary hover:underline">
                      support@memento.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone Support</h4>
                    <p className="text-sm text-muted-foreground mb-1">Call us during business hours (9am-5pm EST).</p>
                    <a href="tel:+18005551234" className="text-sm text-primary hover:underline">
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Issues</option>
                      <option value="billing">Billing & Subscription</option>
                      <option value="technical">Technical Problems</option>
                      <option value="feature">Feature Requests</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                      className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Attachment (optional)</Label>
                    <Input
                      id="attachment"
                      type="file"
                      className="bg-muted/50 border-primary/20 focus:ring-primary/30"
                    />
                    <p className="text-xs text-muted-foreground">
                      Max file size: 10MB. Supported formats: JPG, PNG, PDF.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Submit Ticket
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle>Support Hours & Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Business Hours</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 8:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 6:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Expected Response Times</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Live Chat:</span>
                        <span>Immediate</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Email:</span>
                        <span>Within 24 hours</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Support Tickets:</span>
                        <span>Within 48 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-sm">
                  <p className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800 dark:text-blue-300">
                      For urgent issues outside of business hours, Professional and Enterprise plan customers can access
                      emergency support through the 24/7 hotline provided in your account dashboard.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
