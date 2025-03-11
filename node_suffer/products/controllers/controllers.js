import products from '../products.js';
import { v4 as uuidv4 } from 'uuid';

export const getAll = (req, res) => {
    res.json(products);
}

export const getById = (req, res) => {
    const product = products.find(w => w.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('product not found');
    }
}

export const create = (req, res) => {
    const newproduct = { id: uuidv4(), ...req.body };
    products.push(newproduct);
    res.status(201).json(newproduct);
}

export const updateById = (req, res) => {
    const index = products.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
        products[index] = { id: req.params.id, ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).send('product not found');
    }
}

export const deleteById = (req, res) => {
    const index = products.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
        const deletedproduct = products.splice(index, 1);
        res.json(deletedproduct);
    } else {
        res.status(404).send('product not found');
    }
}