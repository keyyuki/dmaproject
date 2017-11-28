library(quantmod)
library(PerformanceAnalytics)
sym.vec <-c("^GSPC","^VIX")
getSymbols(sym.vec, from = "2005-01-03", to = "2015-09-16")
attach(mtcars)
par(mfrow=c(2,2)) 
plot(GSPC, main="GSPC")


GSPC <- GSPC[, "GSPC.Adjusted", drop=F]
hist(GSPC)
GSPC.logret = CalculateReturns(GSPC, method="log")
GSPC.logret[1] = 0.0

plot(GSPC.logret, main="GSPC.logret")
hist(GSPC.logret)
