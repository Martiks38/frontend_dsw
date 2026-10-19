import { loginUserAction, logoutUserAction, resetPasswordAction } from './auth';
import { createBoatAction, findBoatsAction } from './boat';
import { createClientAction } from './client/createClientAction';
import { submitContactForm } from './contact';
import { createEmployeeAction } from './employee/createEmployeeAction';
import {
  createDepartureAction,
  listActiveDeparturesAction,
  registerReturnAction,
} from './operations';
import { changePasswordAction, updateProfileAction } from './profile';
import {
  assignServiceRequest,
  cancelServiceRequest,
  createServiceRequest,
  updateServiceRequestManagement,
} from './service-request';

export const actions = {
  auth: { loginUserAction, logoutUserAction, resetPasswordAction },
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
  boat: { createBoatAction, findBoatsAction },
  boatDeparture: {
    createDepartureAction,
    registerReturnAction,
    listActiveDeparturesAction,
  },
};
