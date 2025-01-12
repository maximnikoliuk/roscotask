export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  text: string;
  email: string;
  password: string;
};

export type UserSliceType = {
  userList: UserType[];
  totalCount: number;
}
