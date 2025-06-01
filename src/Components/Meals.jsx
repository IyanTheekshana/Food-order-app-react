import { useEffect, useState } from 'react';
import { getAvailableMeals } from '../firebase/firebaseService.js';
import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.jsx';
import LoadingImg from '../assets/loading.svg'
import Error from './Error.jsx';

export default function Meals() {
  const { isLoading, error, data:loadedMeals, sendRequest } = useHttp([]);

  useEffect(() => {
    sendRequest(getAvailableMeals);
  }, [sendRequest]);

  return (
     <>
      {isLoading && <div className='loading'><img src={LoadingImg}/></div>}
      {error && <Error message={error} title="Faild to fetch meals"></Error>}
      <ul id='meals'>
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
