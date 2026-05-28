import { motion } from 'motion/react'

const modules = [
  { number: '01', title: 'Sistemas Lineales', methods: 'Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado', insight: 'Los métodos iterativos convergen más rápido cuando la matriz es diagonalmente dominante. LU es directo pero costoso para sistemas grandes.' },
  { number: '02', title: 'Raíces', methods: 'Bisección, Newton-Raphson, Secante', insight: 'Newton-Raphson converge cuadráticamente pero requiere derivada. Bisección siempre converge si hay cambio de signo, pero es lento.' },
  { number: '03', title: 'Interpolación', methods: 'Lagrange, Newton, Splines Cúbicos', insight: 'Los splines cúbicos evitan el fenómeno de Runge con datos irregulares. Newton permite agregar puntos sin recalcular todo.' },
  { number: '04', title: 'Integración', methods: 'Trapecio, Simpson 1/3, Simpson 3/8', insight: 'Simpson 1/3 es más preciso que el trapecio con el mismo número de puntos. Simpson 3/8 es útil cuando n no es divisible por 2.' },
  { number: '05', title: 'EDOs', methods: 'Euler, Heun, Runge-Kutta 4', insight: 'RK4 ofrece precisión O(h⁴) con 4 evaluaciones por paso. Euler es simple pero inestable para pasos grandes.' },
]

export function ConclusionsPage() {
  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">06</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Conclusiones
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed max-w-lg">
          Reflexiones sobre los métodos numéricos aplicados al abastecimiento, precios y conflicto social venezolano.
        </p>
      </motion.div>

      <section className="space-y-4">
        <h2 className="text-[13px] font-medium text-text">Métodos y hallazgos</h2>
        <div className="space-y-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="border border-border rounded-lg p-4 hover:bg-surface transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-[11px] text-forest font-mono font-medium mt-0.5">{mod.number}</span>
                <div className="flex-1">
                  <h3 className="text-[13px] font-medium text-text">{mod.title}</h3>
                  <p className="text-[11px] text-text-dim font-mono mt-0.5">{mod.methods}</p>
                  <p className="text-[12px] text-text-secondary mt-2 leading-relaxed">{mod.insight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-l-2 border-forest bg-forest-bg/50 rounded-r-md p-4">
        <h2 className="text-[13px] font-medium text-text mb-2">Contexto aplicado</h2>
        <p className="text-[12px] text-text-secondary leading-relaxed">
          Los sistemas lineales modelan la distribución desde plantas de acopio. Las raíces encuentran puntos de equilibrio
          entre oferta y demanda. La interpolación reconstruye curvas de precios con datos incompletos. La integración
          calcula costos acumulados. Las EDOs simulan cómo las reservas se agotan con el tiempo. Cada método tiene
          limitaciones que deben considerarse según el problema.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-text">Limitaciones</h2>
        <ul className="space-y-2 text-[12px] text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los métodos iterativos pueden no converger si la condición inicial está lejos de la solución.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            La interpolación de Lagrange sufre inestabilidad con muchos puntos (fenómeno de Runge).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los métodos de integración asumen suavidad en f(x); comportamientos abruptos generan error.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Ocurrencia (estabilidad) en EDOs depende del tamaño de paso h y las propiedades de la ecuación.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los modelos son simplificaciones; factores sociales y políticos no se capturan en ecuaciones.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-text">Referencias</h2>
        <ul className="space-y-1.5 text-[12px] text-text-dim font-mono">
          <li>Burden & Faires. Numerical Analysis. 10th ed. Cengage, 2016.</li>
          <li>Chapra & Canale. Numerical Methods for Engineers. 7th ed. McGraw-Hill, 2014.</li>
          <li>Atkinson, K. An Introduction to Numerical Analysis. 2nd ed. Wiley, 1989.</li>
        </ul>
      </section>
    </div>
  )
}