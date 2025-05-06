import { redirect } from "next/navigation"

export default function HomePage() {
  // In a real app, you would check for authentication here
  // For demo purposes, we'll just redirect to the dashboard
  redirect("/dashboard")
}
