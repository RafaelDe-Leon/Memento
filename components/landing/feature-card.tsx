import { FileText, Sparkles, Clock, Shield, Smartphone, Users } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "FileText":
        return <FileText className="h-6 w-6 text-primary" />
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-primary" />
      case "Clock":
        return <Clock className="h-6 w-6 text-primary" />
      case "Shield":
        return <Shield className="h-6 w-6 text-primary" />
      case "Smartphone":
        return <Smartphone className="h-6 w-6 text-primary" />
      case "Users":
        return <Users className="h-6 w-6 text-primary" />
      default:
        return <FileText className="h-6 w-6 text-primary" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">{getIcon()}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
