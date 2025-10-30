'use client';

interface TaskItemProps {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
  isCompleted: boolean;
  onComplete: () => void;
  instruction?: string;
  onAction?: () => void; // Optional callback for custom action
  embedUrl?: string; // Optional Facebook post embed URL
}

export default function TaskItem({
  icon,
  title,
  description,
  actionLabel,
  actionUrl,
  isCompleted,
  onComplete,
  instruction,
  onAction,
  embedUrl,
}: TaskItemProps) {
  const handleAction = () => {
    // Open link in new tab
    window.open(actionUrl, '_blank');

    // Call custom action callback if provided
    if (onAction) {
      onAction();
    }
  };

  const handleToggleComplete = () => {
    // Toggle completion status
    onComplete();
  };

  return (
    <div
      className={`bg-old-paper/50 relative border-2 p-6 transition-all duration-300 ${
        isCompleted
          ? 'border-bulgarian-red/30 opacity-80'
          : 'border-walnut/30 hover:border-bulgarian-red/50'
      } `}
    >
      {/* Checklist Item Header */}
      <div className="mb-4 flex items-start gap-4">
        {/* Checkbox - Handwritten style */}
        <label className="group mt-1 flex-shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            className="border-walnut/50 h-6 w-6 cursor-pointer border-2"
            style={{ accentColor: '#E22526' }}
          />
        </label>

        {/* Content */}
        <div className="flex-1">
          <h3
            className={`font-handwritten mb-2 text-2xl transition-colors ${
              isCompleted ? 'text-walnut/60 line-through' : 'text-walnut'
            }`}
          >
            {title}
          </h3>
          <p className="font-handwritten text-walnut/80 mb-3 text-lg leading-relaxed">
            {description}
          </p>

          {/* Instruction */}
          {instruction && (
            <div className="bg-sunflower/10 border-sunflower mb-4 border-l-4 p-3">
              <p className="font-handwritten text-walnut text-base">{instruction}</p>
            </div>
          )}

          {/* Facebook Post Embed */}
          {embedUrl && (
            <div className="my-6 flex justify-center">
              <iframe
                src={embedUrl}
                className="w-full max-w-[500px] rounded-xl border-2 border-walnut/30 shadow-lg"
                height="660"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          )}

          {/* Action button */}
          <button
            onClick={handleAction}
            className="font-handwritten bg-bulgarian-red border-walnut/30 mb-2 border-2 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            {actionLabel}
          </button>
        </div>
      </div>

      {/* Completion stamp */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="border-bulgarian-red flex h-12 w-12 rotate-12 transform items-center justify-center border-3">
            <svg
              className="text-bulgarian-red h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
