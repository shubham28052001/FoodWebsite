import mongoose from "mongoose";
const mongoURI = "mongodb+srv://shubhamsanodiya2805:Shubham12345@cluster0.5d37w.mongodb.net/FoodDB?retryWrites=true&w=majority";
async function fetchData() {
    try {
        await mongoose.connect(mongoURI)
            
        console.log("✅ Connected to MongoDB");

        const db = mongoose.connection.db; 
        const collectionall = db.collection("MenuItems"); 

        const data = await collectionall.find({}).toArray(); 
        
        const collectioncategories=mongoose.connection.db;
        const foodcategory=collectioncategories.collection("categories");
        const food= await foodcategory.find({}).toArray();
         global.MenuItems=data;
         global.categories=food;
        //   console.log(global.MenuItems);
          
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    } 
}

export default fetchData;
