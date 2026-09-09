export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="flex flex-col items-center gap-8">
        {/* SMD Logo instead of generic skeleton */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/logo.png" 
          alt="Loading..." 
          className="h-20 md:h-28 w-auto object-contain animate-pulse scale-[1.2]" 
        />

      </div>
    </div>
  );
}
