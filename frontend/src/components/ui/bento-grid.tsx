import  cn  from "../../lib/utils"


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>{children}</div>
}

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 bg-neutral-900 border border-neutral-800 justify-between flex flex-col space-y-4",
        className,
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-neutral-800 rounded-full p-2 w-fit">{icon}</div>
          <div className="h-1 w-12 bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-full" />
        </div>
        <div className="font-sans font-bold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
               bg-clip-text text-lg mb-2">{title}</div>
        <div className="font-sans font-normal text-neutral-400 text-md">{description}</div>
      </div>
    </div>
  )
}