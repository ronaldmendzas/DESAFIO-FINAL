import { motion } from 'motion/react'

const modules = [
  {
    number: '01',
    title: 'Sistemas Lineales',
    methods: 'Jacobi, Gauss-Seidel, SOR, LU, Gradiente Conjugado',
    scenarios: 'A (Abastecimiento) y F (Rumores y pánico)',
    insight: 'Los métodos iterativos convergen más rápido cuando la matriz es diagonalmente dominante. LU es un método directo que no requiere iteraciones: descompone A en L y U y resuelve por sustitución. En el Escenario A, la solución del sistema indica cuántas unidades enviar a cada zona. En el Escenario F, la matriz de Hilbert muestra cómo un sistema mal condicionado amplifica pequeños cambios en los datos, simulando el efecto de los rumores de desabastecimiento.',
  },
  {
    number: '02',
    title: 'Raíces de Ecuaciones',
    methods: 'Bisección, Newton-Raphson, Secante',
    scenarios: 'E (Umbrales críticos)',
    insight: 'En el Escenario E, la raíz de f(x) = 0.5x² + 8x + 200 - 800 representa el día en que el gasto acumulado supera el ingreso familiar de Bs. 800. Bisección siempre converge si hay cambio de signo pero es lento; Newton-Raphson converge cuadráticamente pero requiere derivada; Secante no necesita derivada pero puede diverger. La raíz encontrada (~27.6 días) marca el umbral de pérdida del poder adquisitivo.',
  },
  {
    number: '03',
    title: 'Interpolación',
    methods: 'Lagrange, Newton, Splines Cúbicos',
    scenarios: 'C (Curva de precios)',
    insight: 'En el Escenario C, con datos del precio de la papa en días 1, 5, 10, 15, 20 y 30 del mes, la interpolación reconstruye la curva continua de precios. Lagrange y Newton coinciden en los datos pero difieren al extrapolar. Los splines cúbicos evitan oscilaciones del fenómeno de Runge. El precio estimado en el día 7 (~11.18 Bs) permite planificar compras en días sin dato oficial.',
  },
  {
    number: '04',
    title: 'Integración Numérica',
    methods: 'Trapecio, Simpson 1/3, Simpson 3/8',
    scenarios: 'D (Costo acumulado)',
    insight: 'En el Escenario D, la integral de p(x) = 0.5x + 8 en [0, 30] representa el gasto mensual acumulado de la canasta básica con precios crecientes. El resultado (~465 Bs) se compara con el gasto sin inflación (8 × 30 = 240 Bs si el precio fuera fijo). La diferencia (~225 Bs) cuantifica la pérdida de poder adquisitivo. Simpson 1/3 es más preciso que el trapecio con el mismo n.',
  },
  {
    number: '05',
    title: 'Ecuaciones Diferenciales',
    methods: 'Euler, Heun, Runge-Kutta 4',
    scenarios: 'B (Reservas) y G (Descontento social)',
    insight: 'En el Escenario B, la EDO R\'(t) = -0.03R modela el vaciado exponencial de reservas. Con R(0) = 1000, la reserva cae a 100 unidades en ~77 días (RK4). Euler se desvía para pasos grandes; RK4 es el más estable. En el Escenario G, el modelo NMD simula cómo neutrales se convierten en manifestantes y cómo los mediadores reducen el conflicto, dependiendo de los parámetros a, b, c, k, r.',
  },
]

export function ConclusionsPage() {
  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-[11px] text-forest font-mono">06</p>
        <h1 className="text-xl font-semibold text-text mt-0.5 tracking-tight">
          Conclusiones
        </h1>
        <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">
          Reflexiones sobre los métodos numéricos aplicados al abastecimiento, precios y conflicto social venezolano, organizadas por escenario.
        </p>
      </motion.div>

      <section className="space-y-4">
        <h2 className="text-[13px] font-medium text-text">Métodos, escenarios y hallazgos</h2>
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
                  <p className="text-[11px] text-forest font-medium mt-1">Escenario{mod.scenarios.includes(' y ') ? 's' : ''}: {mod.scenarios}</p>
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
          Los sistemas lineales modelan la distribución desde plantas de acopio y el efecto de los rumores en la demanda.
          Las raíces encuentran el umbral donde el gasto supera el ingreso familiar.
          La interpolación reconstruye curvas de precios con datos incompletos del mercado.
          La integración calcula el costo acumulado mensual y la pérdida de poder adquisitivo.
          Las EDOs simulan cómo las reservas se agotan y cómo el descontento social se propaga o se estabiliza.
          Cada método tiene limitaciones que deben considerarse según el problema.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[13px] font-medium text-text">Respuestas por escenario</h2>
        <div className="space-y-3">
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario A — Abastecimiento</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              Jacobi, Gauss-Seidel y Gradiente Conjugado convergen a la misma solución: la Zona Norte recibe ~0.55, la Zona Centro ~-0.64 y la Zona Sur ~0.43 unidades. LU confirma estos valores directamente sin iteraciones. Si una ruta se bloquea (se anula un coeficiente), la solución cambia significativamente, lo que demuestra la sensibilidad del sistema de transporte.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario B — Reservas de carburantes</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              Con R\'(t) = -0.03R y R(0) = 1000, la reserva cae por debajo de 100 unidades alrededor del día 77. Euler con h=1 tiene un error del ~3% respecto a la solución exacta R(t) = 1000e^(-0.03t). Heun reduce el error al ~0.03% y RK4 al ~0.000001%. Si el consumo aumenta, la reserva se agota más rápido: con tasa -0.05, cae a 100 en ~46 días.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario C — Curva de precios</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              Los tres métodos (Lagrange, Newton, Splines Cúbicos) estiman el precio de la papa en el día 7 en aproximadamente 11.18 Bs. La curva muestra un incremento sostenido: de 8 Bs el día 1 a 22 Bs el día 30. Los splines cúbicos producen una curva más suave entre puntos, mientras que Lagrange puede oscilar ligeramente con datos dispersos. La interpolación es confiable dentro del rango de datos pero incierta fuera de él.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario D — Costo acumulado</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              La integral de p(x) = 0.5x + 8 en [0, 30] da ~465 Bs. Si el precio fuera constante a 8 Bs (sin inflación), el gasto sería 240 Bs. La diferencia de 225 Bs representa la pérdida de poder adquisitivo. Simpson 1/3 con n=30 da el resultado más preciso, coincidiendo con el valor analítico de 465.0 Bs.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario E — Umbrales críticos</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              La raíz de f(x) = 0.5x² + 8x + 200 - 800 se encuentra en x ≈ 27.55 días. Esto significa que a partir del día 27, el gasto acumulado supera los Bs. 800 de ingreso familiar. Newton-Raphson converge en ~4 iteraciones, Secante en ~6, y Bisección en ~26. Newton es el más rápido pero requiere la derivada; Bisección es el más robusto ante cualquier punto inicial.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario F — Rumores y pánico</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              La matriz de Hilbert 3x3 tiene un número de condición ≈524. LU la resuelve directamente, pero una perturbación adversarial del 5% en el vector b produce cambios del 200% o más en la solución. Esto modela cómo un rumor leve ("hay escasez") genera pánico de compra y desestabiliza toda la red de distribución. Los métodos iterativos divergen o convergen lentamente en sistemas mal condicionados.
            </p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-text">Escenario G — Descontento social (NMD)</h3>
            <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
              El modelo NMD muestra que sin mediadores (D0 = 0), los manifestantes crecen rápidamente y los neutrales disminuyen. Con mediadores activos (D0 mayor a 0), el sistema tiende a estabilizarse: la tasa de diálogo efectiva (c) reduce los manifestantes. Si la tasa de contagio (a) es alta y el diálogo es débil (c bajo), el conflicto se masifica. RK4 proporciona la simulación más estable para analizar estos comportamientos.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-text">Limitaciones</h2>
        <ul className="space-y-2 text-[12px] text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los métodos iterativos pueden no converger si la condición inicial está lejos de la solución o la matriz no es diagonalmente dominante.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            La interpolación de Lagrange sufre inestabilidad con muchos puntos (fenómeno de Runge). Los splines cúbicos son más estables.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los métodos de integración asumen suavidad en f(x); comportamientos abruptos generan error.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            La estabilidad en EDOs depende del tamaño de paso h y de las propiedades de la ecuación. Euler diverge con pasos grandes.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            Los modelos son simplificaciones; factores sociales y políticos no se capturan en ecuaciones.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">-</span>
            El modelo NMD del Escenario G se simplifica a una sola EDO; el sistema completo N-M-D requiere resolver un sistema de EDOs acopladas.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-text">Mejoras posibles</h2>
        <ul className="space-y-2 text-[12px] text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">+</span>
            Implementar sistemas de EDOs acoplados para el modelo NMD completo (N, M, D simultáneamente).
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">+</span>
            Agregar número de condición como resultado en sistemas lineales para cuantificar el mal condicionamiento.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">+</span>
            Permitir comparación visual de múltiples métodos en un solo gráfico para todos los módulos.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">+</span>
            Agregar más productos de la canasta básica al Escenario C para comparar incrementos de precios.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-forest mt-0.5">+</span>
            Implementar métodos de paso adaptativo para EDOs (RKF45) que ajusten h automáticamente.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-text">Método más útil por módulo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-border rounded-lg p-3">
            <p className="text-[11px] text-text-dim mb-1">Sistemas Lineales</p>
            <p className="text-[13px] text-text font-medium">Descomposición LU</p>
            <p className="text-[11px] text-text-secondary">Método directo sin iteraciones. Resuelve cualquier sistema compatible, incluyendo los mal condicionados.</p>
          </div>
          <div className="border border-border rounded-lg p-3">
            <p className="text-[11px] text-text-dim mb-1">Raíces</p>
            <p className="text-[13px] text-text font-medium">Newton-Raphson</p>
            <p className="text-[11px] text-text-secondary">Convergencia cuadrática cuando hay buena condición inicial. Ideal para encontrar umbrales críticos.</p>
          </div>
          <div className="border border-border rounded-lg p-3">
            <p className="text-[11px] text-text-dim mb-1">Interpolación</p>
            <p className="text-[13px] text-text font-medium">Splines Cúbicos</p>
            <p className="text-[11px] text-text-secondary">Curva más suave, sin el fenómeno de Runge. Ideal para estimar precios en días sin dato.</p>
          </div>
          <div className="border border-border rounded-lg p-3">
            <p className="text-[11px] text-text-dim mb-1">Integración</p>
            <p className="text-[13px] text-text font-medium">Simpson 1/3</p>
            <p className="text-[11px] text-text-secondary">Mayor precisión con el mismo número de puntos. Ideal para calcular costos acumulados.</p>
          </div>
          <div className="border border-border rounded-lg p-3 md:col-span-2">
            <p className="text-[11px] text-text-dim mb-1">EDOs</p>
            <p className="text-[13px] text-text font-medium">Runge-Kutta 4</p>
            <p className="text-[11px] text-text-secondary">Precisión O(h⁴) con 4 evaluaciones por paso. Estable para simular reservas y dinámica social.</p>
          </div>
        </div>
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