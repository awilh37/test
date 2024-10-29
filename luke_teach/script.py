# module(s)
import math

# variable(s)
global ourPersonalInput
global strandLength
global ourPersonalListOfNumbers
ourPersonalInput=input("Enter a positive integer: ")
ourPersonalInput=int(ourPersonalInput)
strandLength=0
ourPersonalListOfNumbers = [ourPersonalInput]

# function(s)
def run(n,l,m):
    while True:
        if n==1:
            break
        if not(n/2==round(n/2)):
            n=n*3
            n=n+1
        else:
            n=n/2
        m.append(n)
        l=l+1
    print(str(m))
    print("length:", str(l))

# run
run(ourPersonalInput,strandLength,ourPersonalListOfNumbers)