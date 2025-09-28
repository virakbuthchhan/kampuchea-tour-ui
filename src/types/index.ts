// user profile type
export interface UserProfile {
  uuid: string;
  username: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  bio: string | null;
  avatar: string;
  is_verified: boolean;
}
