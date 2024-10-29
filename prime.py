# modlules
from time import sleep

# global declarations
global n
global d
global q
global primes
global notPrimes

# variables
n=1
d=2
q=1
primes=[1]
notPrimes=[]

# functions
def prime():
    n=+1
    d=1
    q=n/d
    while True:
        d=+1
        q=n/d
        if q>n/2:
            print(str(n),"is prime")
            primes.append(n)
            break
        if not(str(q).__contains__(".")):
            print(str(n),"isn't prime")
            notPrimes.append(n)
            break

# forever loop
while True:
    prime()