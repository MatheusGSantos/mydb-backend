import { prisma } from 'database/index.js';
import { UpdateUserDTO } from 'dtos/users/UpdateUserDTO';
import { User, UserUtilities } from 'models/User';
import AppError from 'utils/AppError.js';

export class UpdateProfileService {
  async execute(userId: string, data: UpdateUserDTO) {
    const { name, driverLicense } = data;
    if (!name && !driverLicense) throw new AppError('Update action needs at least one attribute. Got none.', 400);

    const toValidate = ['id'] as (keyof User)[];
    if (name) toValidate.push('name');
    if (driverLicense) toValidate.push('driverLicense');

    UserUtilities.validate({ id: userId, name, driverLicense }, { pick: toValidate });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        driverLicense,
      },
    });

  }
}
