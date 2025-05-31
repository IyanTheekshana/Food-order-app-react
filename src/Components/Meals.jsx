import { useEffect, useState } from 'react';
import { getAvailableMeals } from '../firebase/firebaseService.js';
import MealItem from './MealItem.jsx';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
        const data = await getAvailableMeals();
        setLoadedMeals(data);
    }

    fetchMeals();
  }, []);

  return (
      <ul id='meals'>
        {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal}></MealItem>)}
      </ul>
  );
}
