import { client } from '../db/connect.js';
import { ObjectId } from 'mongodb';

const getAll = async (req, res) => {
    await client.connect()
    const result = await client.db('RecipeRanker').collection('Recipes').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
};

const getByRecipeId = async (req, res, id) => {
    const recipeId = new ObjectId(id);
    const result = await client.db('RecipeRanker').collection('Recipes').find({ _id: recipeId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
}

const saveNew = async (req, res) => {
    await client.connect()

    const recipe = { ...req.body, _id: new ObjectId() };
    const result = await client.db('RecipeRanker').collection('Recipes').insertOne(recipe);
    if (result.acknowledged) {
        res.status(201).json(recipe);
    } else {
        res.status(500).json({ message: 'Some error occurred while creating the contact.' });
    }
};

const updateSingle = async (req, res) => {
    await client.connect()
    const recipeId = new ObjectId(req.query.id);     

    const result = await client.db('RecipeRanker').collection('Recipes').replaceOne({_id: recipeId}, req.body)

    if (result.acknowledged) {
        res.status(204).send();
      } else {
        res.status(500).json({message: 'Some error occurred while updating the contact.'});
      }
};

const deleteSingle = async (req, res) => {
    await client.connect()
    const recipeId = new ObjectId(req.query.id);
    
    const result = await client.db('RecipeRanker').collection('Recipes').deleteOne({_id: recipeId});
    if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json({message: 'Some error occurred while deleting the contact.'});
      }
}
  

export { getAll, getByRecipeId, saveNew, updateSingle, deleteSingle }

export const recipes = async (req, res) => {
    let id = req.query.id;
    if(id){
        await client.connect();
        return await getByRecipeId(req, res, id);

    }else{
        await client.connect();
        return await getAll(req, res);
    }

};