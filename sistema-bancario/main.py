# Clase Padre
class User:
    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender

    def show_details(self):
        print("Personal Details")
        print("")
        print(f'Name: {self.name}')
        print(f'Age: {self.age}')
        print(f'Gender: {self.gender}')


# Clase Hija
class Bank(User):
    def __init__(self, name, age, gender): #? Constructor de la clase hija con los atributos de la clase padre y los suyos propios
        super().__init__(name, age, gender)  #? Herencia de la clase padre para la clase hija y asi poder usar sus atributos
        self.balance = 0

    def deposit(self, amount): #? Metodo para depositar dinero
        self.amount = amount
        self.balance = self.balance + self.amount
        print(f'Account balance has been updated: {self.balance} CLP')

    def withdraw(self, amount): #? Metodo para retirar dinero
        self.amount = amount
        if self.amount > self.balance:
            print(f'Insufficient Funds | Balance Available: {self.balance} CLP')
        else:
            self.balance = self.balance - self.amount
            print(f'Account balance has been updated: {self.balance} CLP')

    def view_balance(self): #? Metodo para ver el balance de la cuenta
        self.show_details()
        print(f'Account balance: {self.balance} CLP')



# Instanciando la clase hija
# Que es instanciar una clase?
# Es crear un objeto de una clase, a partir de la clase hija y asi poder usar sus metodos y atributos de la clase padre

eduardo = Bank('Eduardo', 35, 'Hombre')
caro = Bank('Yetsi', 30, 'Mujer')

print('--------------------------------')
eduardo.deposit(1000)
print(eduardo.balance)
eduardo.deposit(1000)
print(eduardo.balance)
eduardo.withdraw(4000)
print(eduardo.balance)
eduardo.view_balance()
print('--------------------------------')

print('--------------------------------')
caro.deposit(1000)
print(caro.balance)
caro.deposit(1000)
print(caro.balance)
caro.withdraw(4000)
print(caro.balance)
caro.view_balance()
print('--------------------------------')
