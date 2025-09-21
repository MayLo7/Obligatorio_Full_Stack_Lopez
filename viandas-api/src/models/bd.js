let mealId = 1; 
let ordermealId = 1;
let userId = 1;

const meal = [
    {
        id: mealId++,
        name: "Milanesa con puré",
        price: 350
    },
    {
        id: mealId++,
        name: "Pollo al horno con ensalada",
        price: 400
    },
    {
        id: mealId++,
        name: "Bife de chorizo con papas fritas",
        price: 800
    },
    {
        id: mealId++,
        name: "Sándwich de milanesa",
        price: 300
    },
    {
        id: mealId++,
        name: "Torta de chocolate",
        price: 250
    },
    {
        id: mealId++,
        name: "Pizza muzzarella",
        price: 450
    },
    {
        id: mealId++,
        name: "Tarta de limón",
        price: 500
    },
]

const ordermeal = [
    {
        id: ordermealId++,
        mealId: 1,
        userId: 1,
        quantity: 2,
        deliveryDate: "2023-10-01",
        price: 700,
        Category: "Plato principal",
    },
    {
        id: ordermealId++,
        mealId: 3,
        userId: 2,
        quantity: 1,
        deliveryDate: "2023-10-02",
        price: 800,
        Category: "Plato principal",
    },
    {
        id: ordermealId++,
        mealId: 5,
        userId: 1,
        quantity: 3,
        deliveryDate: "2023-10-03",
        price: 750,
        Category: "Postre",
    },
    {
        id: ordermealId++,
        mealId: 2,
        userId: 3,
        quantity: 1,
        deliveryDate: "2023-10-04",
        price: 400,
        Category: "Plato principal",
    },
    {
        id: ordermealId++,
        mealId: 4,
        userId: 2,
        quantity: 2,
        deliveryDate: "2023-10-05",
        price: 600,
        Category: "Plato principal",
    },
    {
        id: ordermealId++,
        mealId: 6,
        userId: 3,
        quantity: 1,
        deliveryDate: "2023-10-06",
        price: 450,
        Category: "Plato principal",
    },
    {
        id: ordermealId++,
        mealId: 7,
        userId: 1,
        quantity: 2,
        deliveryDate: "2023-10-07",
        price: 1000,
        Category: "Postre",
    },
]

const user = [
    {
        id: userId++,
        name: "Juan Pérez",
        email: "juani78@hotmail.com",
        password: "password123!",
        plan: "premium",
        orderCount: 5
    },
    {
        id: userId++,
        name: "María Gómez",
        email: "marulita@gmail.com",
        password: "securePass!@#",
        plan: "plus",
        orderCount: 2
    },
    {
        id: userId++,
        name: "Carlos López",
        email: "carli1989@icloud.com",
        password: "myPassword$1",
        plan: "plus",
        orderCount: 3
    },
    {
        id: userId++,
        name: "Ana Martínez",
        email: "anitamartinez@gmail.com",
        password: "anaPass2023",
        plan: "premium",
        orderCount: 0
    },
]

const findMealById = id => meal.find(m => m.id === id);
const findUserById = id => user.find(u => u.id === id);
const findOrdermealById = id => ordermeal.find(om => om.id === id);

module.exports = { meal, ordermeal, user, findMealById, findUserById, findOrdermealById };