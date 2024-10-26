from time import sleep
i=2
t=136279841
while t!=0:
    i=i*2
    t=t-1
    print(t)
    print(i)
    sleep(.01)
i=i-1
print(i)