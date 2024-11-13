import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

export async function checkFieldUniqueness<T>(
  repository: Repository<T>,
  fieldName: keyof T,
  value: any,
  errorMessage: string,
): Promise<void> {
  const entityExists = await repository.findOne({
    where: { [fieldName]: value } as any,
  });

  if (entityExists) {
    throw new ConflictException(errorMessage);
  }
}
