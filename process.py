# Import modules

import pandas as pd
import numpy as np
import random
import re
import json



url = "https://docs.google.com/spreadsheets/d/1h7Em7IrvPW-MqvnK3sl4wCrs4U98mpBP3LgxSTn2JME/export?format=csv&gid=371215680"
df = pd.read_csv(url)

event_df = df[df["What do you wish to submit a tracking for?"] == "Event Participation"]
transaction_df = df[df["What do you wish to submit a tracking for?"] == "Shop Transaction"]

#Usernames
signups = pd.read_excel("data/Signups.xlsx")
usernames = signups['Username'].tolist()

START_TICKETS = 10
ticket_balance = {}

for user in usernames:
    ticket_balance[user] = START_TICKETS

cleaned_transactions = []


def normalize_username(name: str) -> str:
    #Account for additional space at end of username
    name = name.strip()
    if name[0] == '@':
        name = name[1:]
    return re.sub(r"[-_]+", "_", name.lower())

def tally(row):
    name = row['What is your Scratch Username? (without the @)']
    
    #Account for wrong captialization
    if (name not in usernames):
        for user in usernames:
            if (normalize_username(name) == normalize_username(user)):
                name = user

    #Print out bad usernames
    if (name not in usernames):
        print(name)
        return

    event_type = row["Which event are you submitting for?"]

    if event_type == "Daily Participation":
        ticket_balance[name] += 5
    else:
        ticket_balance[name] += 15


def transact(row):
    seller = row['What is your Scratch Username? (without the @)']
    buyer = row["What is the username of the buyer? (without the @)"]
    amt = int(row["What is the ticket amount of the transaction?"])

    seller = seller.strip()
    buyer = buyer.strip()

    #Account for wrong captialization
    if (buyer not in usernames):
        for user in usernames:
            normalized_buyer = normalize_username(buyer)
            normalized_user = normalize_username(user)
            if (normalized_buyer.lower() == normalized_user.lower()):
                buyer = user
    

    if (seller not in usernames):
        for user in usernames:
            normalized_seller = normalize_username(seller)
            normalized_user = normalize_username(user)
            if (normalized_seller.lower() == normalized_user.lower()):
                seller = user

    #Print out bad usernames
    if (buyer not in usernames):
        print(buyer)
        return
    
    if (seller not in usernames):
        print(seller)
        return


    ticket_balance[seller] += amt
    ticket_balance[buyer] -= amt


event_df.apply(tally, axis=1)
transaction_df.apply(transact, axis=1)

final = []
for user in ticket_balance:
    line = f'@{user}: {ticket_balance[user]}'
    final.append(line)
    
with open('data/ticket_balance.txt', 'w') as f:
    for line in final:
        f.write(line)
        f.write('\n')

output = {
    f"@{user}": balance
    for user, balance in ticket_balance.items()
}

with open("data/ticket_balance.json", "w") as f:
    json.dump(output, f, indent=2)

print(ticket_balance)