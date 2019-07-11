Insert into Payment(type, customerId, isExpired, expirationDate, cardNumber, securityNumber, name)
Values('VISA', 4, 0, '20200524', '4444333322221111', 123, 'Megan Griffin')

Insert into Payment(type, customerId, routingNumber, bankAccountNumber, name)
Values('BankAccount', 4, '123456789', '9876543210', 'Napoleon Dynamite')

Insert into Payment(type, customerId, payPalAuth)
Values('PayPal', 4, 'ABC123DEF')

SELECT *
FROM Payment