import { UserType } from './user-type.enum.js';

export type User = {
  /** min 1 max 15 */
  name: string;
  /** valid email, cannot be duplicated */
  email: string;
  /** .jpg or .png can be defaulted if not provided */
  avatarPath?: string; //
  /** min 6 max 12 */
  password: string;
  /** 'обычный' | 'pro',  */
  userType: UserType;
};
