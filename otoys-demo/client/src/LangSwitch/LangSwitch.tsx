import React, {FC, useCallback, useState} from 'react';
import { LangSwitchProps } from './LangSwitch.types';
import {cn} from './LangSwitch.cn';
import {Select} from '@gravity-ui/uikit';
import { useChangeLang } from '../utils/i18n';
import { getI18nKeysetFn } from './LangSwitch.i18n';
import { useI18n } from '../utils/i18n';

type HandleUpdate = (value: string[]) => void;

export const LangSwitch: FC<LangSwitchProps> = props => {
    const {
        className,
    } = props;

    const { lang, i18n } = useI18n(getI18nKeysetFn);
    const changeLang = useChangeLang();

    const [value, setValue] = useState<string[]>([lang]);
    const handleUpdate = useCallback<HandleUpdate>(value => {
        setValue(value);

        const [langNew] = value;
        if (langNew === 'en' || langNew === 'ru') {
            changeLang(langNew);
        } else {
            changeLang('en');
        }
    }, [changeLang]);

    return (
        <Select
            size="l"
            value={value}
            onUpdate={handleUpdate}
            placeholder={i18n('placeholder')}
            className={cn(null, [className])}
        >
            <Select.Option content="English" value="en" />
            <Select.Option content="Русский" value="ru" />
        </Select>
    );
};
