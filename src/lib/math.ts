export function calculateTotalCalories(proteins: number, carbs: number, fats: number){
    return (proteins * 4) + (carbs * 4) + (fats * 9);
}

export function calculateDailyTotals(days: any[]) {
    return days.map(day => {
        const totals = {
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0
        };

        day.meals.forEach(meal => {
            meal.entries.forEach(entry => {
                const food = entry.food;

                const ratio = entry.quantity;

                if (food) {
                    totals.calories += (food.calories || 0) * ratio;
                    totals.proteins += (food.proteins || 0) * ratio;
                    totals.carbs += (food.carbs || 0) * ratio;
                    totals.fats += (food.fats || 0) * ratio;
                }
            });
        });

        return {
            date: day.date,
            ...totals
        };
    });
}