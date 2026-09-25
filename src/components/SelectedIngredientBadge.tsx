interface SelectedIngredientBadgeProps {
  name: string;
}

export default function SelectedIngredientBadge({ name }: SelectedIngredientBadgeProps) {
  return (
    <div className="mb-6 p-4 bg-brand-pink-light rounded-xl border border-brand-pink/30 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-brand-pink-deep" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.171.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.878 3.298-.712 4.082a16.98 16.98 0 01-8.49 2.216 16.98 16.98 0 01-8.49-2.216c-1.59-.784-1.944-2.85-.712-4.082L5 14.5" />
        </svg>
      </div>
      <div>
        <p className="text-xs text-brand-text-secondary">Selected Ingredient</p>
        <p className="text-sm font-semibold text-brand-charcoal">{name}</p>
      </div>
    </div>
  );
}
