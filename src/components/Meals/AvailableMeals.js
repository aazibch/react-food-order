import { useEffect, useState } from 'react';
import useHttp from '../../hooks/useHttp';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const { sendRequest, loading, error } = useHttp();

    useEffect(() => {
        sendRequest(
            {
                url: 'https://react-http-5b2d7-default-rtdb.firebaseio.com/availableMeals.json'
            },
            (responseData) => {
                const loadedMeals = [];

                for (const key in responseData) {
                    loadedMeals.push({
                        id: key,
                        ...responseData[key]
                    });
                }

                setMeals(loadedMeals);
            }
        );
    }, [sendRequest]);

    if (loading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
