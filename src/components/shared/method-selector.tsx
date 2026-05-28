import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Method = {
  id: string
  label: string
  description?: string
}

type Props = {
  methods: Method[]
  selected: string
  onSelect: (id: string) => void
  children: React.ReactNode
}

export function MethodSelector({ methods, selected, onSelect, children }: Props) {
  return (
    <Tabs value={selected} onValueChange={onSelect}>
      <TabsList className="bg-deep-night border border-subtle-edge h-auto p-1">
        {methods.map((method) => (
          <TabsTrigger
            key={method.id}
            value={method.id}
            className="text-[12px] uppercase tracking-wider font-mono data-[state=active]:bg-electric-cyan data-[state=active]:text-void-black data-[state=active]:shadow-[0_0_12px_rgba(6,214,160,0.3)]"
          >
            {method.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

