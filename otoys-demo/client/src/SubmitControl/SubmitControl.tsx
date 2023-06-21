import React, {FC, useCallback, useRef} from 'react';
import { SubmitControlProps } from './SubmitControl.types';
import {cn} from './SubmitControl.cn';
import { Button } from '@gravity-ui/uikit';
import './SubmitControl.css';
import { getI18nKeysetFn } from './SubmitControl.i18n';
import { useI18n } from '../utils/i18n';

export const SubmitControl: FC<SubmitControlProps> = props => {
    const {
        className,
        text: textRaw,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    const text = textRaw || i18n('submit');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, [inputRef]);

    return (
        <div className={cn(null, [className])}>
            <input ref={inputRef} className={cn('Input')} type="submit" />
            <Button onClick={handleClick} view="action" size="m">
                {text}
            </Button>
        </div>
    );
};
