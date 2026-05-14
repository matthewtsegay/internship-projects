stock_prices = {
    "banana":60,
    "apple":100,
    "orange":80,
    "pineapple":120,
}

# Dictionary to store user portfolio

portfolio = {}

# Accept use request 

print("Enter yout stock holdings('done' to finish ):")
while True:
    stock = input("stock sysmbol(like 'apple'):").lower()
    if stock == "done":
        break
    if stock not in stock_prices:
        print("Stock not found! Please enter a valid stock sysmbol:")
        continue
    try:
        quantity = int(input(f"How many shares of {stock}?: "))
        portfolio[stock] = portfolio.get(stock, 0) + quantity
    except ValueError:
        print("Invalid quantity. Try again.")

# Calculate total portfolio value

total_value = 0
for stock,quantity in portfolio.items():
    price = stock_prices[stock]
    value = price * quantity
    total_value += value
    print(f"{stock}: {quantity} shares * ${price} = ${value}")
    
print(f"Total Investment: ${total_value}")

# Save to file (optional)
save = input("Do you want to save this to a file? (yes/no): ").lower()
if save == "yes":
    with open("portfolio.txt", "w") as file:
        for stock, qty in portfolio.items():
            price = stock_prices[stock]
            value = qty * price
            file.write(f"{stock}: {qty} shares × ${price} = ${value}\n")
        file.write(f"Total Investment: ${total_value}\n")
    print("Saved to portfolio.txt")
