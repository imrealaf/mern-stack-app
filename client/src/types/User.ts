export interface IUser {
  _id: string;
  email: string;
  isActive: boolean;
  emailIsVerified: boolean;
  date: Date;
  role: string;

  profile: {
    photo?: string;
    name: string;
    location?: string;
    gender?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };

  __v: number;
}

export type UserState = {
  loading: boolean;
  user: IUser | null;
};
