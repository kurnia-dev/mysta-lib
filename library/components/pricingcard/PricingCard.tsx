import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

export interface PricingCardProps {
  label: string;
  price: string;
  description?: string;
  features?: string[];
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function PricingCard({
  label,
  price,
  description,
  features,
  selected = false,
  onSelect,
  className,
}: PricingCardProps): JSX.Element {
  const preset = useComponentPreset('PricingCard', {
    props: { label, price, description, features, selected, onSelect },
    context: { selected },
  }) ?? {};

  return (
    <div
      className={clsx(preset.root?.className, onSelect && 'cursor-pointer', className)}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect?.(); }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className={clsx(preset.label?.className)}>
          {label}
        </span>
        {selected && (
          <span className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-[0.65rem] font-bold shrink-0">
            ✓
          </span>
        )}
      </div>
      <div className={clsx(preset.price?.className)}>
        {price}
      </div>
      {description && (
        <div className={clsx(preset.description?.className, 'mt-2')}>
          {description}
        </div>
      )}
      {features && features.length > 0 && (
        <ul className={clsx(preset.features?.className)}>
          {features.map((f) => (
            <li className={clsx(preset.featureItem?.className)} key={f}>
              <span className="text-success-500">✓</span> {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
