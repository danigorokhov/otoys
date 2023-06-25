import { useUnit } from 'effector-react';

import { $userMeta } from '../userMeta.models';

export const useUserMeta = () => {
    return useUnit($userMeta);
};
