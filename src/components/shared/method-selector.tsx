import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Method = {
  id: string
  label: string
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
            className="text-[12px] font-mono data-[state=active]:bg-charcoal data-[state=active]:text-ghost-white"
          >
            {method.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

export { TabsContent as MethodContent } from '@/components/ui/tabs'