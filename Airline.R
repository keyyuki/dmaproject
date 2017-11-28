data(airpass)
par(mfrow=c(3,1))
plot(airpass,ylab="Air Passengers",col="blue")
plot(log(airpass),ylab=" Log of Air Passengers",col="blue")
plot(diff(log(airpass)), ylab="Diff of Log Air Passengers",col="blue")


points(diff(log(airpass)), x=time(diff(log(airpass))), pch=as.vector(season(diff(log(airpass)))))
layout(matrix(c(1,2,3,4), 2, 2, byrow = TRUE))
acf(as.vector(diff(log(airpass))),main="differenced")
acf(as.vector(diff(diff(log(airpass)),lag=12)),main="seasonal differenced")
plot(diff(diff(log(airpass)),lag=12),col="blue",ylab="seasonal differenced")
hist(diff(diff(log(airpass)),lag=12),main="histogram",xlab="difference")

mod <- arima(log(airpass), order = c(0,1,1),seasonal=list(order=c(0,1,1),period=12))
mod

par(mfrow=c(1,1))
tsdiag(mod)
shapiro.test(residuals(mod))
plot(mod,n1=c(1970,1),n.ahead=36,pch=19,ylab="Predicted Air Passengers",transform=exp,col="blue")