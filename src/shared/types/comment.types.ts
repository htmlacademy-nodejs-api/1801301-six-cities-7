import { User } from './user.types.js';

export type Comment = {
  /** min 5 max 1024 */
  commentsText: string;
  /** e,g, '2024-01-15T09:51:10.735Z',
   * not used when comment is being created
   */
  publicationDate: Date;
  /** from 1 to 5 (round) */
  rating: number;
  /** User entity */
  commentAuthor: User;
};
