import { loginUserAction, logoutUserAction } from './auth';
import { submitContactForm } from './contact';
import { changePasswordAction, updateProfileAction } from './profile';
import {
  assignServiceRequest,
  cancelServiceRequest,
  createServiceRequest,
  updateServiceRequestManagement,
} from './service-request';

export const actions = {
  auth: { loginUserAction, logoutUserAction },
  contact: { submitContactForm },
  serviceRequest: {
    createServiceRequest,
    updateServiceRequestManagement,
    assignServiceRequest,
    cancelServiceRequest,
  },
  profile: { changePasswordAction, updateProfileAction },
};
