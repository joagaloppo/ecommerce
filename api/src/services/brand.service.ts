import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

const getBrands = async () => {
    const brands = await prisma.brand.findMany();
    return brands;
};

const brandService = {
    getBrands,
};

export default brandService;
