import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import RecipeCard from '../components/RecipeCard.jsx';


const APP_ID="bcf4c849";
const APP_KEY= "1d0ab4e4af63a0dc6ed50cd8f44fd7ea";


const HomePage = () => {

  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipe([]);
    try{
      const res = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`)
      const data = await res.json();
      setRecipe(data.hits);
    console.log(data);
    
      
      
    }
    catch (error)
    {
       console.log(error.message);
       
    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() =>{
    fetchRecipes("chicken")
  }, []);


  const handleSearchRecipe = (e) => {
   e.preventDefault();
    fetchRecipes(e.target[0].value);
  }
  return (
    <div className='bg-[#faf9fb] p-10 md:p-8   flex-1 md:pl-32 '>
     <div className='max-w-screen-lg mx-auto  md:px-2'>
     <form onSubmit={handleSearchRecipe}>
      <label className='input shadow-md flex items-center gap-2  md:py-1 md:h-10 '>
      <Search  size={"19"} />
      <input type='text' className='text-sm md:text-sm grow ' placeholder='what do you want to cook today?'/>
      </label>
     </form>
     <h1 className='font-bold text-3xl md:text-xl mt-4'>
      Recomended Recipes
     </h1>
     <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>
      popular choices
     </p>

     <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3   '>

      {!loading && recipe.map(({recipe},index)=>(
        <RecipeCard key={recipe.uri} recipe={recipe}
       
        />
      ))}


     {/* 1st recipe */}
       
       {loading && 
       
      [...Array(9)].map((_, index) => (
        <div key={index} className="flex w-52 flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
      )) }
    

     </div>
     </div>
    </div>
  )
}

export default HomePage
