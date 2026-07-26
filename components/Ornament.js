export default function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-l from-char-line to-transparent" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 14"
        className="flex-shrink-0 text-saffron/50"
      >
        <path
          d="M7 0L8.6 5.4L14 7L8.6 8.6L7 14L5.4 8.6L0 7L5.4 5.4Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-char-line to-transparent" />
    </div>
  );
}
