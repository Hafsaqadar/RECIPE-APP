import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'

const FavoritesPage = () => {
	// Use state to track favorites
	const [favorites, setFavorites] = useState([]);

	// Load favorites when component mounts and update when localStorage changes
	useEffect(() => {
		const loadFavorites = () => {
			const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
			setFavorites(storedFavorites);
		};

		// Initial load
		loadFavorites();

		// Listen for storage changes and our custom event
		window.addEventListener('storage', loadFavorites);
		window.addEventListener('favoritesUpdated', loadFavorites);

		return () => {
			window.removeEventListener('storage', loadFavorites);
			window.removeEventListener('favoritesUpdated', loadFavorites);
		};
	}, []);

	// Function to remove from favorites
	const removeFromFavorites = (recipe) => {
		// Get current favorites from localStorage
		const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
		
		// Remove the recipe
		const updatedFavorites = currentFavorites.filter(fav => fav.label !== recipe.label);
		
		// Update localStorage
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		
		// Immediately update the UI by filtering out the removed recipe
		setFavorites(prev => prev.filter(fav => fav.label !== recipe.label));
		
		// Dispatch event to notify other components
		window.dispatchEvent(new Event('favoritesUpdated'));
	};

	return (
		<div className='bg-[#faf9fb] flex-1 p-10 min-h-screen'>
			<div className='max-w-screen-lg mx-auto'>
				<p className='font-bold text-3xl md:text-5xl my-4'>My Favorites</p>

				{favorites.length === 0 && (
					<div className='h-[80vh] flex flex-col items-center justify-center gap-4'>
						<img src="/404.svg" alt="No favorites" className='h-3/4'/>
						<p className='text-xl text-gray-500'>No favorite recipes yet</p>
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{favorites.map((recipe) => (
						<RecipeCard 
							key={recipe.label} 
							recipe={recipe}
							onFavoriteClick={() => removeFromFavorites(recipe)}
							isFavorite={true}
							isInFavoritesPage={true}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default FavoritesPage
