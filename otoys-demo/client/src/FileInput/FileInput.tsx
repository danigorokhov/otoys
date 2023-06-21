import React, {ChangeEventHandler, forwardRef, useCallback, useRef, useState} from 'react';
import { FileInputProps } from './FileInput.types';
import {cn} from './FileInput.cn';
import { Button, Text } from '@gravity-ui/uikit';
import './FileInput.css';
import { getI18nKeysetFn } from './FileInput.i18n';
import { useI18n } from '../utils/i18n';

export const FileInput = forwardRef<HTMLDivElement, FileInputProps>((props, ref) => {
    const {
        className,
        name,
        value = null,
        onChange = () => {},
        onBlur,
        inputRef: inputRefPassed,
        accept,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    const [file, setFile] = useState<File | null>(value);
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
        if (event.target.files) {
            const newFile = Array.from(event.target.files)[0];

            setFile(newFile);
            onChange(newFile);
        }
    }, [onChange]);

    const inputRefLocal = useRef<HTMLInputElement | null>(null);
    const inputRef = inputRefPassed ?? inputRefLocal;

    const handleClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, [inputRef]);

    return (
        <div className={cn(null, [className])} ref={ref}>
            <input
                className={cn('Input')}
                type="file"
                tabIndex={-1}
                name={name}
                ref={inputRef}
                onBlur={onBlur}
                onChange={handleChange}
                accept={accept}
            />
            <Button onClick={handleClick} size="m">
                {i18n('upload')}
            </Button>
            {file && <Text className={cn('Filename')} variant="body-1">
                {file.name}
            </Text>}
        </div>
    );
});
