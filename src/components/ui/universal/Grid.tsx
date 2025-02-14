
interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const columnsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
};

export const Grid = ({
  children,
  columns = 1,
  gap = "md",
  className = "",
}: GridProps) => {
  return (
    <div
      className={`grid ${columnsClasses[columns as keyof typeof columnsClasses]} ${
        gapClasses[gap]
      } ${className}`}
    >
      {children}
    </div>
  );
};
