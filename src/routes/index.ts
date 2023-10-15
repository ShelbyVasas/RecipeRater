import { getAll, getByRecipeId, saveNew, updateSingle, deleteSingle, recipes } from '../controllers/recipesController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};
import express from 'express';
const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.get("/", (req, res) => {
	res.send("Recipe Ranker");
  });
app.get("/recipes",  async (req,res) => recipes(req,res))
app.post("/recipes", saveNew);
app.put("/recipes/", updateSingle);
app.delete("/recipes/", deleteSingle);

// Server setup
app.listen(3000, () => {
	console.log("Server is Running")
})