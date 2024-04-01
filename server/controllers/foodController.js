import Food from "../models/foodSchema.js";

export const getAllFoodGroupedByCategory = async (req, res) => {
  try {
    const allFood = await Food.find();

    const foodByCategory = {};

    allFood.forEach(food => {
      if (!foodByCategory[food.category]) {
        foodByCategory[food.category] = [];
      }
      foodByCategory[food.category].push(food);
    });

    res.status(200).json(foodByCategory);
  } catch (error) {
    console.log('Error in getAllFoodGroupedByCategory controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const uploadFood=async(req,res)=>{
  try{
    const {name,about,price,category}=req.body;

    const newFood=new Food({
      name,
      about,
      price,
      category
    })

    await newFood.save()

    res.status(201).json({
      name:newFood.name,
      about:newFood.about,
      price:newFood.price,
      category:newFood.category
    })
  }catch(error){
    console.error('Error in uploadFood controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const deleteFood=async(req,res)=>{
  try{
    const deletedFood=await Food.findByIdAndDelete(req.params.id)

    if(!deletedFood){
      return res.status(404).json({message:'Artikal nije pronadjen'})
    }

    res.status(200).json({message:'Artikal uspesno izbrisan'})
  }catch(error){
    console.log('Error in deletedFood controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const updateFood=async(req,res)=>{
  try{
    const updatedFood=await Food.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      about:req.body.about,
      price:req.body.price
    })
    res.status(200).json(updatedFood)
  }catch(error){
    console.log('Error in updateFood controller',error.message)
    console.log('Server error')
  }
}
