# 🥨 Grocery-TO-Buy-List-Full-Stack 🥨

## Premise:

😱 How many times did you forget to buy something essential after your grocery haul?<br/>
😎 Instore Grocery shopping can be well-organized and fun!!!<br/>
⏩ Check out this Meal-Oriented To Buy APP! <br/>
✅ Foodie hunting for new grocery stuff? No problem!<br/>

# Check out this APP:

## https://grocerytobuy.herokuapp.com/

# The User Story:

As I a user:

- be able to signup and login
- be able to Add new meal/ingredient
- be able to check ingredients nutrition details
- be able to delete meal one by one/delete all of them
- be able to know the total cost
- be able to add new item from Kroger API

# V1.0 Screenshot

# The Wireframes:

## Login Page

![Project 2-4](https://user-images.githubusercontent.com/19142112/173138472-8a885bfb-54ff-4f78-896f-8d017717c30a.jpg)

## Grocery List

![Project 2-2](https://user-images.githubusercontent.com/19142112/173138644-1f3b57b6-6e1b-481e-b316-33fd137e3140.jpg)

## Create/Edit

![Project 2-3](https://user-images.githubusercontent.com/19142112/173138603-26aa5b98-017b-4576-b7b2-d24aeebb7c36.jpg)

## The ERD:

![p2 erd](https://user-images.githubusercontent.com/19142112/173137285-decd3556-d3ad-40eb-85a5-84e4d5ab9964.jpg)

# Route Table:

- Index GET /mealprep
- Show GET /mealprep/:id
- New GET /mealprep/new
- Edit GET /mealprep/edit/:id
- Update PUT /mealprep/:id

# Technologies Used:

- Javacript
- Node JS
- Express
- EJS
- MongoDB
- Mongoose
- MongoDB Atlas

# API used in this project:

- USDA FOOD DATA CENTER: https://fdc.nal.usda.gov/
- Spoonacular API: https://spoonacular.com/food-api

# Stretch goals/ ICE BOX:

- add Kroger API: https://developer.kroger.com/reference/
- only admin can delete ingredient
