
interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent 
                     bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
        {title}
      </h1>
      {description && <p className="text-gray-400 mt-2">{description}</p>}
    </div>
  );
};
