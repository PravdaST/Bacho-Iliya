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
      className={`
        relative p-6 border-2 transition-all duration-300 bg-old-paper/50
        ${
          isCompleted
            ? 'border-bulgarian-red/30 opacity-80'
            : 'border-walnut/30 hover:border-bulgarian-red/50'
        }
      `}
    >
      {/* Checklist Item Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Checkbox - Handwritten style */}
        <label className="flex-shrink-0 cursor-pointer group mt-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            className="w-6 h-6 border-2 border-walnut/50 cursor-pointer"
            style={{ accentColor: '#E22526' }}
          />
        </label>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-handwritten text-2xl mb-2 transition-colors ${
            isCompleted ? 'text-walnut/60 line-through' : 'text-walnut'
          }`}>
            {title}
          </h3>
          <p className="font-handwritten text-lg text-walnut/80 leading-relaxed mb-3">
            {description}
          </p>

          {/* Instruction */}
          {instruction && (
            <div className="bg-sunflower/10 border-l-4 border-sunflower p-3 mb-4">
              <p className="font-handwritten text-base text-walnut">
                {instruction}
              </p>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={handleAction}
            className="px-6 py-3 font-serif font-bold transition-all mb-2 bg-bulgarian-red text-white border-2 border-walnut/30 hover:scale-105 shadow-lg"
          >
            {actionLabel}
          </button>
        </div>
      </div>

      {/* Completion stamp */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 border-3 border-bulgarian-red flex items-center justify-center transform rotate-12">
            <svg className="w-6 h-6 text-bulgarian-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
