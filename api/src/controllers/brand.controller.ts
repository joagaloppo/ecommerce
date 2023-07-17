import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { brandService } from '../services';

const getBrands = catchAsync(async (req: Request, res: Response) => {
    const users = await brandService.getBrands();
    res.json({ users });
});

const userController = {
    getBrands,
};

export default userController;
