export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo skeleton */}
        <div className="w-16 h-16 rounded-full skeleton" />
        
        {/* Text skeletons */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-4 skeleton" />
          <div className="w-32 h-3 skeleton" />
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface)' }}>
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
              animation: 'loading-bar 1.5s ease-in-out infinite',
              width: '40%',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
