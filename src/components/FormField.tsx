import { useState } from 'react';
import { Check } from 'lucide-react';

// === Text Input ===
interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  error?: string;
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  error,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-brand-charcoal mb-1.5">
        {label} {required && <span className="text-brand-pink-deep">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 text-sm rounded-lg border bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink-deep/20 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-brand-pink/50 focus:border-brand-pink-deep'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// === Textarea ===
interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-brand-charcoal mb-1.5">
        {label} {required && <span className="text-brand-pink-deep">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 text-sm rounded-lg border bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink-deep/20 resize-none ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-brand-pink/50 focus:border-brand-pink-deep'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// === Select ===
interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
  placeholder = 'Select an option',
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-brand-charcoal mb-1.5">
        {label} {required && <span className="text-brand-pink-deep">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-4 py-3 text-sm rounded-lg border bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink-deep/20 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-brand-pink/50 focus:border-brand-pink-deep'
        } ${value === '' ? 'text-brand-text-secondary' : 'text-brand-charcoal'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// === Checkbox Group ===
interface CheckboxGroupProps {
  label: string;
  name: string;
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  error?: string;
}

export function CheckboxGroup({
  label,
  name,
  values,
  options,
  onChange,
  required,
  error,
}: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div>
      <span className="block text-sm font-medium text-brand-charcoal mb-2">
        {label} {required && <span className="text-brand-pink-deep">*</span>}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const checked = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm text-left rounded-lg border transition-all ${
                checked
                  ? 'border-brand-pink-deep bg-brand-pink-light text-brand-charcoal'
                  : 'border-brand-pink/40 bg-white text-brand-text-secondary hover:border-brand-pink-deep/50'
              }`}
              aria-pressed={checked}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                  checked ? 'bg-brand-pink-deep text-white' : 'border border-brand-pink/50'
                }`}
              >
                {checked && <Check className="w-3.5 h-3.5" />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// === Consent Checkbox ===
interface ConsentCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function ConsentCheckbox({
  label,
  name,
  checked,
  onChange,
  error,
}: ConsentCheckboxProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`flex items-start gap-3 text-left w-full p-4 rounded-lg border transition-all ${
          error
            ? 'border-red-400 bg-red-50/30'
            : checked
              ? 'border-brand-pink-deep bg-brand-pink-light'
              : focused
                ? 'border-brand-pink-deep/50'
                : 'border-brand-pink/40 bg-white'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
            checked ? 'bg-brand-pink-deep text-white' : 'border border-brand-pink/50'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5" />}
        </span>
        <span className="text-xs text-brand-text-secondary leading-relaxed">{label}</span>
      </button>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
      {/* Hidden input for form name attribute */}
      <input type="hidden" name={name} value={checked ? 'Yes' : ''} />
    </div>
  );
}

// === Form Validation Helpers ===
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return phone.replace(/\s/g, '').length >= 7;
}
