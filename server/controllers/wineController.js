import Wine from "../models/wineSchema.js";

export const getAllWineGroupedByCategory = async (req, res) => {
  try {
    const allWine = await Wine.find();

    const wineByCategory = {};

    allWine.forEach(wine => {
      if (!wineByCategory[wine.category]) {
        wineByCategory[wine.category] = [];
      }
      wineByCategory[wine.category].push(wine);
    });

    res.status(200).json(wineByCategory);
  } catch (error) {
    console.log('Error in getAllFoodGroupedByCategory controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const uploadWine=async(req,res)=>{
  try{
    const {name,about,price,category}=req.body;

    const newWine=new Wine({
      name,
      about,
      price,
      category
    })
    await newWine.save()

    res.status(201).json({
      name:newWine.name,
      about:newWine.about,
      price:newWine.price,
      category:newWine.category
    })
  }catch(error){
    console.error('Error in uploadWine controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const deleteWine=async(req,res)=>{
  try{
    const deletedWine=await Wine.findByIdAndDelete(req.params.id)

    if(!deletedWine){
      return res.status(404).json({message:'Artikal nije pronadjen'})
    }

    res.status(200).json({message:'Artikal uspesno izbrisan'})
  }catch(error){
    console.log('Error in deleteWine controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const updateWine=async(req,res)=>{
  try{
    const updatedWine=await Wine.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      about:req.body.about,
      price:req.body.price
    })
    res.status(200).json(updatedWine)
  }catch(error){
    console.log('Error in updateWine controller',error.message)
    console.log('Server error')
  }
}