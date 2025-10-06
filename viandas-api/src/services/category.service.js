const Category = require('../models/category.model');
const { StatusCodes } = require("http-status-codes");



const getCategories = async () => {

    const categories = await Category.find();



    if (!categories) {
        return null;
    }


    return { categories };
}




module.exports = { getCategories};