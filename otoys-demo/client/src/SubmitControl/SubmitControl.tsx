import React, {FC, useCallback, useRef} from 'react';
import { SubmitControlProps } from './SubmitControl.types';
import {cn} from './SubmitControl.cn';
import { Button } from '@gravity-ui/uikit';
import './SubmitControl.css';
import {i18n} from './SubmitControl.i18n';

export const SubmitControl: FC<SubmitControlProps> = props => {
    const {
        className,
        text = i18n('submit'),
    } = props;

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
