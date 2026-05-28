# Modelos Matemáticos

Todos los algoritmos se implementan desde cero en TypeScript puro, sin depender de librerías numéricas externas. math.js se usa únicamente para parsing de funciones ingresadas por el usuario y operaciones auxiliares con matrices.

---

## Módulo 1: Sistemas de Ecuaciones Lineales

### Problema

Dado un sistema Ax = b, encontrar x que satisface el sistema, donde A es la matriz de coeficientes y b el vector de términos independientes.

### Método: Jacobi

**Fórmula:**

$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j \neq i} a_{ij} x_j^{(k)} \right)$$

**Algoritmo:**

```
INPUT: A[n×n], b[n], x0[n], tol, maxIter
OUTPUT: x[n], iteraciones, errores

1. x = copia(x0)
2. para k = 0 hasta maxIter-1:
3.   x_new = vector[n]
4.   para i = 0 hasta n-1:
5.     suma = 0
6.     para j = 0 hasta n-1:
7.       si j != i: suma += A[i][j] * x[j]
8.     x_new[i] = (b[i] - suma) / A[i][i]
9.   error = norma(x_new - x)
10.  registrar iteración k+1, x_new, error
11.  si error < tol: retornar x_new, iteraciones
12.  x = x_new
13. retornar x, iteraciones (no convergió)
```

**Convergencia:** A debe ser diagonalmente dominante o simétrica definida positiva.

---

### Método: Gauss-Seidel

**Fórmula:**

$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)} \right)$$

**Algoritmo:**

```
INPUT: A[n×n], b[n], x0[n], tol, maxIter
OUTPUT: x[n], iteraciones, errores

1. x = copia(x0)
2. para k = 0 hasta maxIter-1:
3.   x_old = copia(x)
4.   para i = 0 hasta n-1:
5.     suma = 0
6.     para j = 0 hasta n-1:
7.       si j != i: suma += A[i][j] * x[j]
8.     x[i] = (b[i] - suma) / A[i][i]
9.   error = norma(x - x_old)
10.  registrar iteración k+1, x, error
11.  si error < tol: retornar x, iteraciones
12. retornar x, iteraciones (no convergió)
```

**Convergencia:** Usa valores actualizados inmediatamente. Converge más rápido que Jacobi.

---

### Método: SOR (Successive Over-Relaxation)

**Fórmula:**

$$x_i^{(k+1)} = (1 - \omega) x_i^{(k)} + \frac{\omega}{a_{ii}} \left( b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)} \right)$$

donde ω es el parámetro de relajación (1 < ω < 2 para sobrerrelajación).

**Algoritmo:**

```
INPUT: A[n×n], b[n], x0[n], omega, tol, maxIter
OUTPUT: x[n], iteraciones, errores

1. x = copia(x0)
2. para k = 0 hasta maxIter-1:
3.   x_old = copia(x)
4.   para i = 0 hasta n-1:
5.     suma = 0
6.     para j = 0 hasta n-1:
7.       si j != i: suma += A[i][j] * x[j]
8.     x_gs = (b[i] - suma) / A[i][i]
9.     x[i] = (1 - omega) * x[i] + omega * x_gs
10.  error = norma(x - x_old)
11.  registrar iteración k+1, x, error
12.  si error < tol: retornar x, iteraciones
13. retornar x, iteraciones (no convergió)
```

**Nota:** ω = 1 equivale a Gauss-Seidel. ω óptimo depende del espectro de A.

---

### Método: Descomposición LU

**Fórmula:**

$$A = LU$$

donde L es triangular inferior con 1s en la diagonal y U es triangular superior.

Luego se resuelve: Ly = b (sustitución progresiva), Ux = y (sustitución regresiva).

**Algoritmo (Doolittle):**

```
INPUT: A[n×n], b[n]
OUTPUT: L[n×n], U[n×n], x[n]

1. n = tamaño(A)
2. L = identidad(n), U = copia(A)
3. para k = 0 hasta n-1:
4.   para i = k+1 hasta n-1:
5.     L[i][k] = U[i][k] / U[k][k]
6.     para j = k hasta n-1:
7.       U[i][j] = U[i][j] - L[i][k] * U[k][j]
8. y = sustitucion_progresiva(L, b)
9. x = sustitucion_regresiva(U, y)
10. retornar L, U, x
```

**Incluye pivoteo parcial** para estabilidad numérica.

---

### Método: Gradiente Conjugado

**Fórmula:**

$$x_{k+1} = x_k + \alpha_k p_k$$
$$p_{k+1} = r_{k+1} + \beta_k p_k$$

donde α_k = (r_k^T r_k) / (p_k^T A p_k) y β_k = (r_{k+1}^T r_{k+1}) / (r_k^T r_k).

**Algoritmo:**

```
INPUT: A[n×n], b[n], x0[n], tol, maxIter
OUTPUT: x[n], iteraciones, errores

1. x = copia(x0)
2. r = b - A*x
3. p = copia(r)
4. rs_old = r^T * r
5. para k = 0 hasta maxIter-1:
6.   Ap = A * p
7.   alpha = rs_old / (p^T * Ap)
8.   x = x + alpha * p
9.   r = r - alpha * Ap
10.  rs_new = r^T * r
11.  error = sqrt(rs_new)
12.  registrar iteración k+1, x, error
13.  si error < tol: retornar x, iteraciones
14.  p = r + (rs_new / rs_old) * p
15.  rs_old = rs_new
16. retornar x, iteraciones (no convergió)
```

**Requisito:** A debe ser simétrica definida positiva.

---

## Módulo 2: Raíces de Ecuaciones

### Problema

Encontrar x tal que f(x) = 0.

### Método: Bisección

**Condición:** f(a) y f(b) deben tener signos opuestos.

**Algoritmo:**

```
INPUT: f, a, b, tol, maxIter
OUTPUT: raíz, iteraciones, errores

1. si f(a) * f(b) >= 0: error("No hay cambio de signo")
2. para k = 0 hasta maxIter-1:
3.   c = (a + b) / 2
4.   fc = f(c)
5.   error = (b - a) / 2
6.   registrar iteración k+1, c, fc, error
7.   si |fc| < tol o error < tol: retornar c, iteraciones
8.   si f(a) * fc < 0: b = c
9.   sino: a = c
10. retornar c, iteraciones
```

**Convergencia:** Lineal, orden 1. Garantizada si hay cambio de signo.

---

### Método: Newton-Raphson

**Fórmula:**

$$x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$$

**Algoritmo:**

```
INPUT: f, f', x0, tol, maxIter
OUTPUT: raíz, iteraciones, errores

1. x = x0
2. para k = 0 hasta maxIter-1:
3.   fx = f(x)
4.   fpx = f'(x)
5.   si |fpx| < 1e-15: error("Derivada cercana a cero")
6.   x_new = x - fx / fpx
7.   error = |x_new - x|
8.   registrar iteración k+1, x_new, f(x_new), error
9.   si error < tol: retornar x_new, iteraciones
10.  x = x_new
11. retornar x, iteraciones
```

**Convergencia:** Cuadrática (orden 2) cerca de la raíz. Requiere derivada.

---

### Método: Secante

**Fórmula:**

$$x_{k+1} = x_k - \frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}$$

**Algoritmo:**

```
INPUT: f, x0, x1, tol, maxIter
OUTPUT: raíz, iteraciones, errores

1. para k = 0 hasta maxIter-1:
2.   f0 = f(x0)
3.   f1 = f(x1)
4.   si |f1 - f0| < 1e-15: error("División por cero")
5.   x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
6.   error = |x2 - x1|
7.   registrar iteración k+1, x2, f(x2), error
8.   si error < tol: retornar x2, iteraciones
9.   x0 = x1
10.  x1 = x2
11. retornar x2, iteraciones
```

**Convergencia:** Superlineal, orden ≈ 1.618. No requiere derivada.

---

## Módulo 3: Interpolación

### Problema

Dados n+1 puntos (x₀, y₀), (x₁, y₁), ..., (xₙ, yₙ), encontrar una función que pase exactamente por todos ellos.

### Método: Lagrange

**Fórmula:**

$$P(x) = \sum_{i=0}^{n} y_i \prod_{\substack{j=0 \\ j \neq i}}^{n} \frac{x - x_j}{x_i - x_j}$$

**Algoritmo:**

```
INPUT: puntos[(x0,y0), ...], x_eval
OUTPUT: P(x_eval), puntos de la curva

1. n = longitud(puntos) - 1
2. resultado = 0
3. para i = 0 hasta n:
4.   Li = 1
5.   para j = 0 hasta n:
6.     si j != i: Li *= (x_eval - puntos[j].x) / (puntos[i].x - puntos[j].x)
7.   resultado += puntos[i].y * Li
8. retornar resultado

Para graficar: evaluar P(x) para x en [min_x, max_x] con paso fino.
```

**Ventaja:** Fórmula directa, sin resolver sistema.  
**Desventaja:** Ineficiente si se agrega un punto (recalcular todo).

---

### Método: Newton (Diferencias Divididas)

**Fórmula:**

$$P(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \cdots$$

**Algoritmo:**

```
INPUT: puntos[(x0,y0), ...], x_eval
OUTPUT: P(x_eval), tabla de diferencias divididas

1. n = longitud(puntos) - 1
2. dd = tabla[n+1][n+1]  // diferencias divididas
3. para i = 0 hasta n: dd[i][0] = puntos[i].y
4. para j = 1 hasta n:
5.   para i = 0 hasta n-j:
6.     dd[i][j] = (dd[i+1][j-1] - dd[i][j-1]) / (puntos[i+j].x - puntos[i].x)
7. resultado = dd[0][n]
8. para k = n-1 hasta 0:
9.   resultado = resultado * (x_eval - puntos[k].x) + dd[0][k]
10. retornar resultado, tabla dd

Para graficar: evaluar P(x) para x en [min_x, max_x] con paso fino.
```

**Ventaja:** Agregar un punto solo agrega una fila.  
**Desventaja:** Requiere cálculo de tabla de diferencias.

---

### Método: Splines Cúbicos

**Fórmula:** En cada subintervalo [xᵢ, xᵢ₊₁]:

$$S_i(x) = a_i + b_i(x-x_i) + c_i(x-x_i)^2 + d_i(x-x_i)^3$$

**Algoritmo (spline natural):**

```
INPUT: puntos[(x0,y0), ...], x_eval
OUTPUT: S(x_eval), coeficientes de cada tramo

1. n = longitud(puntos) - 1
2. h[i] = x[i+1] - x[i] para i = 0..n-1
3. Sistema tridiagonal para c[i]:
   h[i-1]*c[i-1] + 2*(h[i-1]+h[i])*c[i] + h[i]*c[i+1] = 3*((y[i+1]-y[i])/h[i] - (y[i]-y[i-1])/h[i-1])
   con c[0] = 0, c[n] = 0 (spline natural)
4. Resolver sistema tridiagonal (Thomas algorithm)
5. b[i] = (y[i+1]-y[i])/h[i] - h[i]*(2*c[i]+c[i+1])/3
6. d[i] = (c[i+1]-c[i])/(3*h[i])
7. a[i] = y[i]
8. Para x_eval: encontrar i tal que x[i] <= x_eval <= x[i+1]
9. retornar a[i] + b[i]*(x_eval-x[i]) + c[i]*(x_eval-x[i])^2 + d[i]*(x_eval-x[i])^3
```

**Ventaja:** Suave (C² continua), sin oscilaciones de Runge.  
**Desventaja:** Más complejo de implementar.

---

## Módulo 4: Integración Numérica

### Problema

Calcular ∫ₐᵇ f(x) dx numéricamente.

### Método: Regla del Trapecio

**Fórmula (compuesta):**

$$\int_a^b f(x)dx \approx \frac{h}{2}\left[f(a) + 2\sum_{i=1}^{n-1}f(x_i) + f(b)\right]$$

donde h = (b-a)/n.

**Algoritmo:**

```
INPUT: f, a, b, n (subintervalos)
OUTPUT: integral aproximada

1. h = (b - a) / n
2. suma = f(a) + f(b)
3. para i = 1 hasta n-1:
4.   xi = a + i * h
5.   suma += 2 * f(xi)
6. resultado = (h / 2) * suma
7. retornar resultado
```

**Error:** O(h²), orden 2.

---

### Método: Simpson 1/3

**Fórmula (compuesta):**

$$\int_a^b f(x)dx \approx \frac{h}{3}\left[f(a) + 4\sum_{impares}f(x_i) + 2\sum_{pares}f(x_i) + f(b)\right]$$

donde h = (b-a)/n y n debe ser par.

**Algoritmo:**

```
INPUT: f, a, b, n (subintervalos, debe ser par)
OUTPUT: integral aproximada

1. si n es impar: n += 1
2. h = (b - a) / n
3. suma = f(a) + f(b)
4. para i = 1 hasta n-1:
5.   xi = a + i * h
6.   si i es impar: suma += 4 * f(xi)
7.   sino: suma += 2 * f(xi)
8. resultado = (h / 3) * suma
9. retornar resultado
```

**Error:** O(h⁴), orden 4. Más preciso que el trapecio.

---

### Método: Simpson 3/8

**Fórmula (compuesta):**

$$\int_a^b f(x)dx \approx \frac{3h}{8}\left[f(a) + 3\sum_{i=1,2,4,5,...}f(x_i) + 2\sum_{i=3,6,9,...}f(x_i) + f(b)\right]$$

donde h = (b-a)/n y n debe ser múltiplo de 3.

**Algoritmo:**

```
INPUT: f, a, b, n (subintervalos, múltiplo de 3)
OUTPUT: integral aproximada

1. ajustar n a múltiplo de 3
2. h = (b - a) / n
3. suma = f(a) + f(b)
4. para i = 1 hasta n-1:
5.   xi = a + i * h
6.   si i % 3 == 0: suma += 2 * f(xi)
7.   sino: suma += 3 * f(xi)
8. resultado = (3 * h / 8) * suma
9. retornar resultado
```

**Error:** O(h⁴), orden 4. Similar precisión que Simpson 1/3.

---

## Módulo 5: Ecuaciones Diferenciales Ordinarias

### Problema

Resolver y'(t) = f(t, y) con condición inicial y(t₀) = y₀.

---

### Método: Euler

**Fórmula:**

$$y_{k+1} = y_k + h \cdot f(t_k, y_k)$$

**Algoritmo:**

```
INPUT: f, t0, y0, h, tFinal
OUTPUT: [(t, y)], tabla de valores

1. t = t0, y = y0
2. resultados = [(t, y)]
3. mientras t < tFinal:
4.   y = y + h * f(t, y)
5.   t = t + h
6.   resultados.agregar((t, y))
7. retornar resultados
```

**Error:** O(h), orden 1. Simple pero impreciso.

---

### Método: Heun (Euler Mejorado)

**Fórmula:**

$$\tilde{y}_{k+1} = y_k + h \cdot f(t_k, y_k)$$
$$y_{k+1} = y_k + \frac{h}{2}[f(t_k, y_k) + f(t_{k+1}, \tilde{y}_{k+1})]$$

**Algoritmo:**

```
INPUT: f, t0, y0, h, tFinal
OUTPUT: [(t, y)], tabla de valores

1. t = t0, y = y0
2. resultados = [(t, y)]
3. mientras t < tFinal:
4.   k1 = f(t, y)
5.   y_pred = y + h * k1
6.   k2 = f(t + h, y_pred)
7.   y = y + (h / 2) * (k1 + k2)
8.   t = t + h
9.   resultados.agregar((t, y))
10. retornar resultados
```

**Error:** O(h²), orden 2. Predictor-corrector.

---

### Método: Runge-Kutta 4 (RK4)

**Fórmula:**

$$k_1 = f(t_k, y_k)$$
$$k_2 = f(t_k + \frac{h}{2}, y_k + \frac{h}{2}k_1)$$
$$k_3 = f(t_k + \frac{h}{2}, y_k + \frac{h}{2}k_2)$$
$$k_4 = f(t_k + h, y_k + h k_3)$$
$$y_{k+1} = y_k + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

**Algoritmo:**

```
INPUT: f, t0, y0, h, tFinal
OUTPUT: [(t, y)], tabla de valores

1. t = t0, y = y0
2. resultados = [(t, y)]
3. mientras t < tFinal:
4.   k1 = f(t, y)
5.   k2 = f(t + h/2, y + h/2 * k1)
6.   k3 = f(t + h/2, y + h/2 * k2)
7.   k4 = f(t + h, y + h * k3)
8.   y = y + (h/6) * (k1 + 2*k2 + 2*k3 + k4)
9.   t = t + h
10.  resultados.agregar((t, y))
11. retornar resultados
```

**Error:** O(h⁴), orden 4. Mejor relación precisión/esfuerzo.

---

### Sub-módulo B: Reservas de Carburantes

**Modelo:**

$$R'(t) = E(t) - C(t)$$

donde:
- R(t) = reserva disponible
- E(t) = tasa de entrada (abastecimiento)
- C(t) = tasa de consumo

**Parámetros del formulario:**
- R(0): reserva inicial
- E(t): constante o función del tiempo
- C(t): constante o función que aumenta por pánico
- Nivel crítico: umbral de alarma

**Pregunta clave:** ¿En qué día t* se cumple R(t*) ≤ nivel crítico?

---

### Sub-módulo G: Descontento Social (Modelo NMD)

**Modelo:**

$$N'(t) = -aN(t)M(t) + bD(t)$$
$$M'(t) = aN(t)M(t) - cM(t)D(t)$$
$$D'(t) = kM(t) - rD(t)$$

donde:
- N(t) = ciudadanos neutrales
- M(t) = manifestantes activos
- D(t) = mediadores/diálogo
- a = tasa de contagio del descontento
- b = tasa de retorno a neutralidad
- c = efectividad del diálogo
- k = reacción institucional
- r = desgaste de mediadores

**Restricción:** N(t) + M(t) + D(t) = P (población total constante).

**Para RK4 se convierte a sistema:** Se aplica el método a las 3 ecuaciones simultáneamente, es decir, el vector Y = [N, M, D] y F(t, Y) = [N', M', D'].

---

## Tipos TypeScript

Cada algoritmo retorna un objeto tipado:

```typescript
type IterationData = {
  iteration: number
  values: number[]
  error: number
}

type AlgorithmResult<T extends string> = {
  method: T
  result: number | number[]
  iterations: IterationData[]
  converged: boolean
  executionTime: number
}
```

Esto permite que cada módulo tenga resultados consistentes y comparables entre métodos.