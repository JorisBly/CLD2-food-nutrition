    import { neon } from '@neondatabase/serverless';
    import { drizzle } from 'drizzle-orm/neon-http';
    import {users, foodItems, diaryDays, meals, mealEntries, nutritionGoals, weightEntries, sessions} from './schema';
    import { faker } from '@faker-js/faker';
    import 'dotenv/config';

    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    async function main() {

        console.log("🧹 Nettoyage de la base de données...");

        await db.delete(mealEntries);
        await db.delete(meals);
        await db.delete(diaryDays);
        await db.delete(nutritionGoals);
        await db.delete(weightEntries);
        await db.delete(foodItems);
        await db.delete(sessions);
        await db.delete(users);

        console.log("✨ Base de données nettoyée.");
        console.log("🌱 Seeding en cours...");

        const [testUser] = await db.insert(users).values({
            email: "user.test@example.com",
            username: "UserTest",
            firstname: "Jhon",
            lastname: "Doe",
            password: "$2b$10$e9F4r0M8j0bRHBl2yFIeEeHB63sx5T3YkE0cbl/.e5lclfsNdhpGm",
        }).returning();

        console.log("Utilisateur créé");

        await db.insert(nutritionGoals).values({
            userId: testUser.id,
            dailyCalories: 2200,
            targetProteins: "150.00",
            targetCarbs: "250.00",
            targetFats: "70.00",
            startDate: new Date(),
        });

        const foodsToInsert = [
            { name: "Poulet (Blanc)", proteins: "31.00", carbs: "0.00", fats: "3.60", calories: "165", img: "poulet.png" },
            { name: "Riz Basmati", proteins: "2.70", carbs: "28.00", fats: "0.30", calories: "130" , img: "basmati.png"},
            { name: "Avocat", proteins: "2.00", carbs: "8.50", fats: "14.70", calories: "160", img: "avocado.png" },
            { name: "Oeuf Entier", proteins: "13.00", carbs: "1.10", fats: "11.00", calories: "155", img: "egg.png" },
            { name: "Beurre de Cacahuète", proteins: "25.00", carbs: "20.00", fats: "50.00", calories: "588", img: "peanut-butter.png" }
        ];



        const insertedFoods = await db.insert(foodItems).values(foodsToInsert).returning();
        console.log("🍎 Aliments insérés");

        const weightToInsert = [
            {weight: 75, date: "2025-01-01", userId: testUser.id},
            {weight: 120, date: "2026-01-02", userId: testUser.id},
            {weight: 80, date: "2026-02-03", userId: testUser.id},
            {weight: 100, date: "2026-03-01", userId: testUser.id},
            {weight: 80, date: "2026-04-02", userId: testUser.id},
        ]

        const insertedWeights = await db.insert(weightEntries).values(weightToInsert).returning();



        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const [day] = await db.insert(diaryDays).values({
                userId: testUser.id,
                date: date,
            }).returning();

            const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

            for (const type of mealTypes) {
                const [meal] = await db.insert(meals).values({
                    diaryDay: day.id,
                    type: type,
                }).returning();

                const randomFoods = faker.helpers.arrayElements(insertedFoods, { min: 1, max: 3 });

                for (const food of randomFoods) {
                    await db.insert(mealEntries).values({
                        mealId: meal.id,
                        foodItemId: food.id,
                        userId: testUser.id,
                        quantity: faker.number.int({ min: 50, max: 300 }),
                        date: date
                    });
                }
            }

        }

        console.log("✅ Seeding terminé !");
    }

    main().catch(err => {
        console.error(err);
        process.exit(1);
    });