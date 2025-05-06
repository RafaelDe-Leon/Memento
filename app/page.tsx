import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LandingHeader from "@/components/landing/landing-header"
import LandingFooter from "@/components/landing/landing-footer"
import FeatureCard from "@/components/landing/feature-card"
import TestimonialCard from "@/components/landing/testimonial-card"
import FaqItem from "@/components/landing/faq-item"
import ScrollToSection from "@/components/landing/scroll-to-section"
import BackToTop from "@/components/landing/back-to-top"

export default function LandingPage() {
  // Replace with your actual Stripe price ID
  const stripePriceId = "price_1234567890"

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToSection />
      <BackToTop />
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">
                Professional Documentation Made Easy
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Generate Professional Notes in Seconds
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Streamline your documentation workflow with AI-powered note generation tailored for healthcare
                professionals. Save time, reduce errors, and focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur-lg"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/hero.png"
                    alt="Note Generator Illustration"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            TRUSTED BY HEALTHCARE PROFESSIONALS FROM
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-8" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Professional Documentation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of tools designed specifically for healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="FileText"
              title="Customizable Templates"
              description="Choose from a variety of professional templates tailored to different healthcare specialties."
            />
            <FeatureCard
              icon="Sparkles"
              title="AI-Powered Generation"
              description="Our advanced AI understands medical terminology and generates accurate, compliant documentation."
            />
            <FeatureCard
              icon="Clock"
              title="Time-Saving Workflows"
              description="Reduce documentation time by up to 75% with our streamlined note generation process."
            />
            <FeatureCard
              icon="Shield"
              title="HIPAA Compliant"
              description="Enterprise-grade security ensures all patient data is protected and compliant with regulations."
            />
            <FeatureCard
              icon="Smartphone"
              title="Mobile Friendly"
              description="Access your notes from anywhere with our responsive design that works on all devices."
            />
            <FeatureCard
              icon="Users"
              title="Team Collaboration"
              description="Share templates and notes with your team to ensure consistent documentation standards."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Process, Powerful Results</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to be intuitive and efficient, saving you valuable time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Select Your Template</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from our library of specialty-specific templates or create your own custom template.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Fill in Key Details</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter the essential information or use our AI to extract details from your existing notes.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Generate & Export</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Instantly generate professional notes that you can copy, export, or integrate with your EHR system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our users have to say about how our platform has transformed their documentation process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This tool has cut my documentation time in half. The templates are intuitive and the AI suggestions are surprisingly accurate."
              author="Dr. Sarah Johnson"
              role="Pediatrician"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="As a speech therapist, detailed notes are crucial. This platform helps me create comprehensive session notes in minutes instead of hours."
              author="Michael Chen"
              role="Speech-Language Pathologist"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="The early intervention templates have been a game-changer for our team. Consistent documentation has never been easier."
              author="Lisa Rodriguez"
              role="Early Intervention Specialist"
              avatar="/placeholder.svg?height=80&width=80"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              One plan with everything you need. No hidden fees or complicated tiers.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/10">
              <div className="bg-primary text-primary-foreground text-center py-2 text-base font-medium">
                Professional Plan
              </div>
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold">$29.99</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>

                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                  Everything you need for professional note generation
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                  <div className="grid gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Unlimited note generation
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create as many notes as you need</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">All note templates</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Access to all specialty-specific templates
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Advanced AI assistance</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Intelligent suggestions and auto-completion
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Priority support</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get help when you need it most</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Cloud storage for notes</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Securely store and access your notes anywhere
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Export to PDF/EHR</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Easily export notes to various formats
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full py-6 text-base bg-primary hover:bg-primary/90" asChild>
                  <Link href="/login">Start Your 14-Day Free Trial</Link>
                </Button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  No credit card required. Cancel anytime.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Need a custom plan for your organization?{" "}
                <Link href="#contact" className="text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="Is my data secure and HIPAA compliant?"
              answer="Yes, we take security and compliance seriously. Our platform is fully HIPAA compliant, with end-to-end encryption and secure data storage. We never store patient identifiable information unless explicitly authorized."
            />
            <FaqItem
              question="Can I customize templates for my specialty?"
              answer="While we offer a wide range of specialty-specific templates, you can also create and customize your own templates to match your exact workflow and documentation requirements."
            />
            <FaqItem
              question="How accurate is the AI-generated content?"
              answer="Our AI has been trained on thousands of medical documents and is continuously improved. It generates highly accurate content based on the information you provide, though we always recommend reviewing AI-generated content before finalizing."
            />
            <FaqItem
              question="Can I integrate with my existing EHR system?"
              answer="Yes, our Professional and Team plans include EHR integration capabilities. We currently support major EHR systems including Epic, Cerner, and Athena Health, with more integrations being added regularly."
            />
            <FaqItem
              question="What if I need help getting started?"
              answer="We offer comprehensive onboarding support for all plans, including documentation, video tutorials, and live chat support. Team and Enterprise plans also include personalized onboarding sessions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-purple-600/90 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Documentation Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of healthcare professionals who are saving time and improving their documentation quality.
          </p>
          <Button size="lg" variant="secondary" className="text-base px-8 py-6 rounded-full">
            <Link href="/login">Start Your Free Trial</Link>
          </Button>
          <p className="mt-4 text-sm opacity-80">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
