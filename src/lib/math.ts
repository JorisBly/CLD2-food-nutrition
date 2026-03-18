export function calculateTotalCalories(proteins: number, carbs: number, fats: number){
    return (proteins * 4) + (carbs * 4) + (fats * 9);
}