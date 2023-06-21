import { useUnit } from 'effector-react';
import { Lang } from '../i18n.types';
import { langChanged } from '../i18n.models';

type UseLang = () => (langNew: Lang) => void;

export const useChangeLang: UseLang = () => {
    return useUnit(langChanged);
};
