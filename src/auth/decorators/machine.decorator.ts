import { SetMetadata } from '@nestjs/common';

export const MACHINE_KEY = 'machineKey';
export const FromMachine = () => SetMetadata(MACHINE_KEY, 'feigejiawei');
