import { loginUserAction, logoutUserAction } from './auth';
import { createBoatAction } from './boat/createBoatAction';
import { createClientAction } from './client/createClientAction';
import { submitContactForm } from './contact';
import { createEmployeeAction } from './employee/createEmployeeAction';
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
  client: { createClientAction },
  employee: { createEmployeeAction },
  boat: { createBoatAction },
};
