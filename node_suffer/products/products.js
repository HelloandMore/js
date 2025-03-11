import { v4 as uuidv4 } from 'uuid';

let products = [
    { id: uuidv4(), name: 'Milk', category: 'Dairy', price: '1.5', available: true },
    { id: uuidv4(), name: 'Bread', category: 'Bakery', price: '2', available: false },
    { id: uuidv4(), name: 'Eggs', category: 'Dairy', price: '3', available: true },
    { id: uuidv4(), name: 'Apple', category: 'Fruit', price: '1', available: false },
    { id: uuidv4(), name: 'Orange', category: 'Fruit', price: '1.5', available: true },
    { id: uuidv4(), name: 'Banana', category: 'Fruit', price: '0.5', available: true },
    { id: uuidv4(), name: 'Carrot', category: 'Vegetable', price: '0.5', available: false },
    { id: uuidv4(), name: 'Potato', category: 'Vegetable', price: '0.5', available: true },
    { id: uuidv4(), name: 'Tomato', category: 'Vegetable', price: '1', available: true },
    { id: uuidv4(), name: 'Onion', category: 'Vegetable', price: '0.5', available: true },
    { id: uuidv4(), name: 'Cucumber', category: 'Vegetable', price: '0.5', available: false },
    { id: uuidv4(), name: 'Cheese', category: 'Dairy', price: '4', available: true },
    { id: uuidv4(), name: 'Chicken', category: 'Meat', price: '6', available: true },
    { id: uuidv4(), name: 'Rice', category: 'Grains', price: '2.5', available: true },
    { id: uuidv4(), name: 'Pasta', category: 'Grains', price: '1.5', available: false },
    { id: uuidv4(), name: 'Salmon', category: 'Seafood', price: '8', available: true },
    { id: uuidv4(), name: 'Spinach', category: 'Vegetable', price: '1', available: true },
    { id: uuidv4(), name: 'Yogurt', category: 'Dairy', price: '2', available: false },
    { id: uuidv4(), name: 'Beef', category: 'Meat', price: '7', available: true },
    { id: uuidv4(), name: 'Lettuce', category: 'Vegetable', price: '1.5', available: true },
    { id: uuidv4(), name: 'Pineapple', category: 'Fruit', price: '2.5', available: true },
    { id: uuidv4(), name: 'Chocolate', category: 'Sweets', price: '3', available: false },
    { id: uuidv4(), name: 'Coffee', category: 'Beverages', price: '5', available: true }
];

export default products;