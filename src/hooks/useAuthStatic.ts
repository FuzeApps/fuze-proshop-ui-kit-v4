import { useContext } from 'react';
import { AuthStaticContext } from '../providers/auth-static-provider';

export const useAuthStatic = () => {
  return useContext(AuthStaticContext);
};
