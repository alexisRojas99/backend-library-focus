export interface JwtPayload {
  user: {
    id: number;
    username: string;
    is_suspended: boolean;
    roles: string[];
  };
}
