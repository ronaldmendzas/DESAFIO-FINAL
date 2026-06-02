import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { GodButton } from '@/components/shared/god-button'
import { NumberInput } from '@/components/shared/number-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { LinearSystemMethod } from '@/types/linear-systems'

type Props = {
  onCalculate: (data: {
    matrix: number[][]
    vector: number[]
    tolerance: number
    maxIterations: number
    method: LinearSystemMethod
    omega?: number
  }) => void
  onReset: () => void
  isCalculating: boolean
  defaultData?: {
    matrix: number[][]
    vector: number[]
    method: LinearSystemMethod
    tolerance: number
    maxIterations: number
    omega?: number
  } | null
}

const METHODS: { id: LinearSystemMethod; label: string }[] = [
  { id: 'jacobi', label: 'Jacobi' },
  { id: 'gauss-seidel', label: 'Gauss-Seidel' },
  { id: 'sor', label: 'SOR' },
  { id: 'lu', label: 'LU' },
  { id: 'conjugate-gradient', label: 'Grad. Conjugado' },
]

const DEFAULT_MATRIX_3X3 = [
  [10, -1, 2],
  [-1, 11, -1],
  [2, -1, 10],
]

const DEFAULT_VECTOR_3 = [7, -8, 6]

export function LinearSystemsForm({ onCalculate, onReset, isCalculating, defaultData }: Props) {
  const [matrix, setMatrix] = useState<string[][]>(DEFAULT_MATRIX_3X3.map(r => r.map(String)))
  const [vector, setVector] = useState<string[]>(DEFAULT_VECTOR_3.map(String))
  const [tolerance, setTolerance] = useState('0.000001')
  const [maxIterations, setMaxIterations] = useState('100')
  const [method, setMethod] = useState<LinearSystemMethod>('jacobi')
  const [omega, setOmega] = useState('1.5')
  const [size, setSize] = useState<3 | 4 | 5>(3)

  useEffect(() => {
    if (defaultData) {
      setMatrix(defaultData.matrix.map(r => r.map(v => String(v))))
      setVector(defaultData.vector.map(v => String(v)))
      setTolerance(String(defaultData.tolerance))
      setMaxIterations(String(defaultData.maxIterations))
      setMethod(defaultData.method)
      if (defaultData.omega) setOmega(String(defaultData.omega))
      const n = defaultData.matrix.length
      if (n === 4 || n === 5) setSize(n as 3 | 4 | 5)
    }
  }, [defaultData])

  const handleSizeChange = (newSize: 3 | 4 | 5) => {
    setSize(newSize)
    const newMatrix = Array.from({ length: newSize }, (_, i) =>
      Array.from({ length: newSize }, (_, j) => {
        if (i < DEFAULT_MATRIX_3X3.length && j < DEFAULT_MATRIX_3X3[0].length) {
          return String(DEFAULT_MATRIX_3X3[i][j])
        }
        return i === j ? '10' : '0'
      })
    )
    const newVector = Array.from({ length: newSize }, (_, i) =>
      i < DEFAULT_VECTOR_3.length ? String(DEFAULT_VECTOR_3[i]) : '0'
    )
    setMatrix(newMatrix)
    setVector(newVector)
  }

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    )
    setMatrix(newMatrix)
  }

  const handleVectorChange = (index: number, value: string) => {
    const newVector = vector.map((v, i) => (i === index ? value : v))
    setVector(newVector)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      matrix: matrix.map(r => r.map(v => parseFloat(v) || 0)),
      vector: vector.map(v => parseFloat(v) || 0),
      tolerance: parseFloat(tolerance),
      maxIterations: parseInt(maxIterations),
      method,
      omega: method === 'sor' ? parseFloat(omega) : undefined,
    })
  }

  const handleReset = () => {
    setMatrix(DEFAULT_MATRIX_3X3.map(r => r.map(String)))
    setVector(DEFAULT_VECTOR_3.map(String))
    setTolerance('0.000001')
    setMaxIterations('100')
    setMethod('jacobi')
    setOmega('1.5')
    setSize(3)
    onReset()
  }

  const showIterativeFields = method !== 'lu'

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Método</Label>
          <Select value={method} onValueChange={(v) => setMethod(v as LinearSystemMethod)}>
            <SelectTrigger className="bg-white border-border font-mono text-[12px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              {METHODS.map((m) => (
                <SelectItem key={m.id} value={m.id} className="font-mono text-[12px]">{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Tamaño</Label>
          <Select value={String(size)} onValueChange={(v) => handleSizeChange(Number(v) as 3 | 4 | 5)}>
            <SelectTrigger className="bg-white border-border font-mono text-[12px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-border">
              <SelectItem value="3" className="font-mono text-[12px]">3x3</SelectItem>
              <SelectItem value="4" className="font-mono text-[12px]">4x4</SelectItem>
              <SelectItem value="5" className="font-mono text-[12px]">5x5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-[11px] text-text-dim mb-1.5 block">Matriz A</Label>
        <div className="border border-border rounded-lg p-3 bg-surface">
          <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${size}, minmax(50px, 1fr))` }}>
            {matrix.map((row, i) =>
              row.map((val, j) => (
                <NumberInput
                  key={`${i}-${j}`}
                  value={val}
                  onChange={(v) => handleMatrixChange(i, j, v)}
                  className="bg-white border-border font-mono text-[12px] text-center h-7 p-1"
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-[11px] text-text-dim mb-1.5 block">Vector b</Label>
        <div className="border border-border rounded-lg p-3 bg-surface">
          <div className="flex gap-1.5">
            {vector.map((val, i) => (
              <NumberInput
                key={i}
                value={val}
                onChange={(v) => handleVectorChange(i, v)}
                className="bg-white border-border font-mono text-[12px] text-center h-7 p-1 flex-1"
              />
            ))}
          </div>
        </div>
      </div>

      {showIterativeFields && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-[11px] text-text-dim mb-1.5 block">Tolerancia</Label>
            <NumberInput
              value={tolerance}
              onChange={setTolerance}
              className="bg-white border-border font-mono text-[12px] h-8"
            />
          </div>
          <div>
            <Label className="text-[11px] text-text-dim mb-1.5 block">Iter. máximas</Label>
            <NumberInput
              value={maxIterations}
              onChange={setMaxIterations}
              className="bg-white border-border font-mono text-[12px] h-8"
            />
          </div>
        </div>
      )}

      {method === 'sor' && (
        <div>
          <Label className="text-[11px] text-text-dim mb-1.5 block">Parámetro omega</Label>
          <NumberInput
            value={omega}
            onChange={setOmega}
            className="bg-white border-border font-mono text-[12px] h-8 w-40"
          />
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <GodButton type="submit" disabled={isCalculating}>
          {isCalculating ? 'Calculando...' : 'Calcular'}
        </GodButton>
        <GodButton type="button" variant="secondary" onClick={handleReset}>
          Limpiar
        </GodButton>
      </div>
    </motion.form>
  )
}