interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h1>
      <p className="text-lg text-gray-600 md:text-xl">{description}</p>
    </div>
  )
}
