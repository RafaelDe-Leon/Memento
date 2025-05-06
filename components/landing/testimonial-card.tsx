interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

export default function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-sm"></div>
          <img
            src={avatar || "/placeholder.svg"}
            alt={author}
            className="h-12 w-12 rounded-full object-cover relative border-2 border-white dark:border-gray-800"
          />
        </div>
        <div className="ml-4">
          <h4 className="font-bold">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
    </div>
  )
}
