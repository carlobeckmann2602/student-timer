export type TokenType = {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
};

export type UserType = {
  id: number | null;
  name: string | null;
  studyCourse: string | null;
  profilePicture: string | null;
  email: string | null;
};

export type AuthStateType = {
  token: TokenType;
  authenticated: boolean | null;
  user: UserType;
};
