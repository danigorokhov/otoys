import React, {FC, useCallback, useEffect} from 'react';
import { EditorSettingsProps, EditorSettingsValues, HandleChange } from './EditorSettings.types';
import {LANGUAGE_OPTIONS, EDITOR_SETTINGS_DEFAULT_VALUES} from './EditorSettings.const';
import {cn} from './EditorSettings.cn';
import './EditorSettings.css';
import { RadioButton, Text } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';

export const EditorSettings: FC<EditorSettingsProps> = props => {
    const {
        className,
    } = props;

    const {control, watch} = useForm<EditorSettingsValues>({
        defaultValues: EDITOR_SETTINGS_DEFAULT_VALUES,
    });

    const handleChange = useCallback<HandleChange>(_formValues => {
        console.log(_formValues);
        // TODO handle _formValues of editor settings
    }, []);

    useEffect(() => {
        const subscription = watch(handleChange);
        return () => subscription.unsubscribe();
    }, [watch, handleChange]);

    const {field} = useController({name: 'language', control});

    return (
        <form className={cn(null, [className])}>
            {/* TODO i18n */}
            <Text variant="subheader-3">
                {/* Editor settings */}
                Настройки редактора
            </Text>

            <div className={cn('Field')}>
                <Text variant="body-2">
                    Язык
                    {/* Language */}
                </Text>
                <RadioButton
                    className={cn('RadioButton')}
                    size="m"
                    options={LANGUAGE_OPTIONS}
                    name={field.name}
                    ref={field.ref}
                    onUpdate={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                />
            </div>
        </form>
    );
};
