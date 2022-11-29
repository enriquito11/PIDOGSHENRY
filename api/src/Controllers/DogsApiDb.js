require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;



const getBreedsApiDb = async (req, res) => {
       
    try{   
        const allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        if(allDogs.data){
        var allBreeds = allDogs.data.map(e => {
            let weight = e.weight.metric.split('-')
            let height = e.height.metric.split('-')
            let life_span = e.life_span.split('-')
            let weightMin = parseInt(weight[0])
            let weightMax = parseInt(weight[1])
            let heightMin = parseInt(height[0])
            let heightMax = parseInt(height[1])
            let life_span_min = parseInt(life_span[0])
            let life_span_max = parseInt(life_span[1])
            return{
                id: e.id,
                name: e.name,
                heightMin: heightMin ? heightMin : heightMax,
                heightMax: heightMax ? heightMax : heightMin,
                weightMin: weightMin ? weightMin : weightMax,
                weightMax: weightMax ? weightMax : weightMin,
                life_span_min: life_span_min ? life_span_min : life_span_max,
                life_span_max: life_span_max ? life_span_max : life_span_min,
                temperament: e.temperament ? e.temperament : 'Not Temperament',
                image: e.image.url
            }
        }) 
        
    } 

    let dbDogs = await Dog.findAll({
                    include: [{
                        model: Temperament,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }]
                })

    let dbBreeds = dbDogs.map(e=>{
        return {
            id: e.id,
            name: e.name,
            heightMin: e.heightMin,
            heightMax: e.heightMax,
            weightMin: e.weightMin,
            weightMax: e.weightMax,
            life_span_min: e.life_span_min,
            life_span_max: e.life_span_max,
            temperament: e.dataValues.temperaments.map(el => el.name).join(', '),
            image: e.image
        }
    })
        let allBreedsApiDb = [...allBreeds, ...dbBreeds]
            return allBreedsApiDb
         
    } catch (error) { console.log(error) }
}

const getBreedsApiDbName = async (req, res) =>{
    const { name } = req.query;
    let allData = await getBreedsApiDb();
    try {
        if(name) {
            let searchName = allData.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            searchName.length>0 ? res.status(200).json(searchName) : res.status(404).send({'msg': 'Breed not found'})
        } else {
            res.status(200).json(allData)
        }
    } catch (error) {
        console.log(error)
    }
}  

const getBreedsID = async (req, res)=>{
    const { id } = req.params;
    let allId = await getBreedsApiDb();
    

    try {
        if(id){
            let breedId = allId.filter(el => (el.id === Number(id) || el.id === String(id)))
            breedId.length>0 ? res.status(200).json(breedId) : res.status(404).send('Breed not found')
        } 
        
    } catch (error) {
        console.log(error)
    }

}

const postCreatedBreed = async (req, res) =>{
    const { name, heightMin, heightMax, weightMin, weightMax, life_span_min, life_span_max, temperament, image } = req.body;   
    try {
       
        const newBreed = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span_min,
            life_span_max,
            image
                     
        });
        
        await newBreed.addTemperaments(temperament)
        res.status(201).json(newBreed).send({"msg": "Breed Created"})
    } catch (error) {
        console.log(error)
        
    }
}

const deleteDogs = async(req,res) => {
  try {
    const { id } = req.query

    await Dog.destroy({
        where: {
          id : id
        }
      });
      
      res.status(200).send("Perro eliminado")
  } catch (error) {
    console.log(error)
  }}
    







module.exports = {
    getBreedsApiDbName,
    getBreedsID,
    postCreatedBreed,
    deleteDogs
}