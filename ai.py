from sympy import symbols, solve, sin, cos, pi

x = symbols('x')
f = sin(2*x) + (3**0.5) * cos(x)

# Finding solutions in the range [0, 2*pi]
solutions = solve(f, x)
print(solutions)
