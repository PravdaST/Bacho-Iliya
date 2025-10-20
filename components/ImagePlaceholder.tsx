interface ImagePlaceholderProps {
  category: 'authentic' | 'products' | 'food' | 'people' | 'process';
  description?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  size?: 'small' | 'medium' | 'large';
}

const categoryLabels: Record<ImagePlaceholderProps['category'], string> = {
  authentic: 'СНИМКА: Автентичност / Традиция',
  products: 'СНИМКА: Продукт',
  food: 'СНИМКА: Готово ястие',
  people: 'СНИМКА: Клиент / Хора',
  process: 'СНИМКА: Производствен процес'
};

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]'
};

const sizeClasses = {
  small: 'max-w-sm',
  medium: 'max-w-2xl',
  large: 'max-w-4xl'
};

export default function ImagePlaceholder({
  category,
  description,
  aspectRatio = 'video',
  size = 'medium'
}: ImagePlaceholderProps) {
  return (
    <div className={`${sizeClasses[size]} mx-auto`}>
      <div
        className={`
          ${aspectRatioClasses[aspectRatio]}
          border-4 border-dashed border-amber-300
          bg-amber-50/50
          rounded-lg
          flex flex-col items-center justify-center
          p-6 sm:p-8
          transition-all hover:border-amber-400 hover:bg-amber-50
        `}
      >
        {/* Camera Icon */}
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {/* Label */}
        <div className="text-center space-y-2">
          <p className="text-sm sm:text-base font-semibold text-amber-800 tracking-wide">
            {categoryLabels[category]}
          </p>

          {description && (
            <p className="text-xs sm:text-sm text-amber-700 max-w-md">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
