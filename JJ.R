library(TSA)
data(JJ)
plot(JJ,col='blue')
par(mfrow=c(2,1))
plot(JJ,col='blue')
plot(log(JJ),ylab='log(Earnings)',type='l',col='blue')

par(mfrow=c(3,1))
plot(diff(log(JJ)),ylab='log differenced',type='l',col='blue')
plot(diff(log(JJ),lag=4),ylab='seasonal diff',type='l',col='blue')
plot(diff(diff(log(JJ),lag=4)),ylab='diff differenced',type='l',col='blue')

series<-diff(diff(log(JJ),lag=4))
adf.test(series)

par(mfrow=c(1,2))
acf(as.vector(series),ci.type='ma')
pacf(as.vector(series),ci.type='ma')

model<-arima(x=log(JJ),order=c(0,1,1),seasonal=list(order=c(0,1,1),period=4))
model

par(mfrow=c(1,1))
shapiro.test(residuals(model))
tsdiag(model)
plot(model,n1=c(1975,1), n.ahead=8, pch=19, ylab='Earnings',transform=exp,col='blue')