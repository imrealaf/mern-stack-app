export type ProfileState = {
  profile: any;
  profiles: any;
  repos: any;
  loading: boolean;
  error: any;
};

export type CreateProfileState = {};

export interface ICreateProfileFormProps {
  createProfileSuccess: any;
  createProfileFail: any;
}
