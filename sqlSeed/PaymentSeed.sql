Insert into Payment(type, customerId, isExpired, expirationDate, cardNumber, securityNumber, name)
Values('VISA', 1, 0, '20200524', '4444333322221111', 123, 'Megan Griffin')

Insert into Payment(type, customerId, routingNumber, bankAccountNumber, name)
Values('BankAccount', 2, '123456789', '9876543210', 'Napoleon Dynamite')

Insert into Payment(type, customerId, payPalAuth)
Values('PayPal', 3, 'ABC123DEF')

SELECT *
FROM Payment