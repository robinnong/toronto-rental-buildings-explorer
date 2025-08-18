export default function SearchLoadingSkeletonCard() {
  return (
    <div className="animate-pulse p-4 rounded-sm bg-gray-100 flex flex-col gap-2">
      <div className="flex gap-4 justify-between">
        <div className="animate-pulse rounded-sm bg-gray-300 h-4 w-80 shrink-1" />
        <div className="animate-pulse rounded-sm bg-gray-300 h-4 w-30 shrink-1" />
      </div>
      <div className="animate-pulse rounded-sm bg-gray-300 h-4 max-w-40" />
      <div className="animate-pulse rounded-sm bg-gray-300 h-4 max-w-120" />
      <div className="flex gap-4 justify-between">
        <div className="animate-pulse rounded-sm bg-gray-300 h-4 w-100 shrink-1" />
        <div className="animate-pulse rounded-sm bg-gray-300 h-4 w-20 shrink-1" />
      </div>
    </div>
  );
}
