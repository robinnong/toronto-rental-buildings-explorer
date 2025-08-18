import LoadingSkeletonCard from "./LoadingSkeletonCard";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 h-full pt-4">
      {Array.from({ length: 5 }, (_, index) => (
        <LoadingSkeletonCard key={index} />
      ))}
    </div>
  );
}
