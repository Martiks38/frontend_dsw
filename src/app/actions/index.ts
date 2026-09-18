import { loginUserAction, logoutUserAction } from './auth';
import { submitContactForm } from './contact';
import { changePasswordAction, updateProfileAction } from './profile';
import { createServiceRequest } from './serviceRequest';

export const actions = {
  auth: { loginUserAction, logoutUserAction },
  contact: { submitContactForm },
  serviceRequest: { createServiceRequest },
  profile: { changePasswordAction, updateProfileAction },
};
