import { ProfilePageLazy as ProfilePage } from './ui/ProfilePage.lazy';

export { profileActions, profileReducer } from './model/slice/profileSlice';
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
export { updateProfileData } from './model/services/updateProfileData/updateProfileData';
export { ProfilePage };
