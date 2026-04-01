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
                if (!food) return;

                const ratio = (Number(entry.quantity) || 0) / 100;

                const p = (Number(food.proteins) || 0) * ratio;
                const c = (Number(food.carbs) || 0) * ratio;
                const f = (Number(food.fats) || 0) * ratio;

                const itemCalories = (p * 4) + (c * 4) + (f * 9)

                totals.proteins += p;
                totals.carbs += c;
                totals.fats += f;
                totals.calories += itemCalories;
            });
        });

        return {
            date: day.date,
            calories: Math.round(totals.calories),
            proteins: Number(totals.proteins.toFixed(1)),
            carbs: Number(totals.carbs.toFixed(1)),
            fats: Number(totals.fats.toFixed(1))
        };
    });
}