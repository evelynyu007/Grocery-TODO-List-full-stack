// const IngredientModel = require("../models/ingredient");

// module.exports = {
//   create,
// };

// async function create(req, res) {
//   console.log("does it run");
//   getInfo = req.body;
//   console.log(getInfo);
//   const ingredient = await IngredientModel.findById(req.params.id);
//   req.body.content = "test";
//   //  the API data stored in the model
//   ingredient.nutrition.push(req.body); // ??
//   ingredient.save(function (err) {
//     res.redirect(`/ingredient/${ingredient._id}`);
//   });
// }

// async function postNutri(req, res) {
//   const params = {
//     api_key: "nNW70iQZe3o7p7bCCSrrasvQAt6i2g7rtb0Cz7xs",
//     query: "egg", //need to get ingredients name
//     dataType: ["Survey (FNDDS)"],
//     pagesize: 3,
//   };
//   const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
//     params.api_key
//   )}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(
//     params.dataType
//   )}&pageSize=${encodeURIComponent(params.pagesize)}`;

//   const response = await fetch(api_url);
//   const dataNutrition = await response.json();
//   console.log(dataNutrition);

//   // const ingredient = await IngredientModel.findById(req.params.id)

//   /// ????
//   res.render("ingredients/show", {
//     title: "Ingredient Detail",
//     ingredient,
//     dataNutrition,
//   });
// }
