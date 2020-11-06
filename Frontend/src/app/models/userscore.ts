import { User } from './user';
import { Score } from './score';
import { Issue } from './issue';

export class UserScore {
  idUser: User;
  idScore: Score;
  sessionId: Issue;
}
