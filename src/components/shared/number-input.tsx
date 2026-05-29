import { type ChangeEvent, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/input'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> & {
  value: string
  onChange: (value: string) => void
}

export function NumberInput({ value, onChange, ...props }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '' || raw === '-' || raw === '-0' || raw === '-0.' || raw === '-0.0') {
      onChange(raw)
      return
    }
    if (raw === '.' || raw === '0.') {
      onChange(raw)
      return
    }
    const parsed = parseFloat(raw)
    if (!Number.isNaN(parsed) || raw === '.') {
      onChange(raw)
    }
  }

  return (
    <Input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}