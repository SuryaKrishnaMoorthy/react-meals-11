import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => { 
  
    const fetchMeals = async () => {
      const response = await fetch('https://task-tracker-15-http-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!')
      };

      const data = await response.json();


      const loadedMeals = [];

      for(const key in data) {
        loadedMeals.push({id: key, ...data[key]});
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch(err =>  {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if(isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    )
  }


	const mealsList = meals.map(meal => (
    <MealItem 
      id={meal.id}
      key={meal.id}
      {...meal}
    />
    ));

	return (
		<section className={classes.meals}>
		<Card>
			<ul>
				{mealsList}
			</ul>
		</Card>
		</section>
	);
};

export default AvailableMeals;