import React, {FC, useCallback, useEffect} from 'react';
import { GeneratorSettingsProps, HandleChange, GeneratorSettingsValues } from './GeneratorSettings.types';
import {cn} from './GeneratorSettings.cn';
import './GeneratorSettings.css';
import { Text, TextInput } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';

export const GeneratorSettings: FC<GeneratorSettingsProps> = props => {
    const {
        className,
    } = props;

    const {control, watch} = useForm<GeneratorSettingsValues>();

    const handleChange = useCallback<HandleChange>(_formValues => {
        console.log(_formValues);
        // TODO handle _formValues of editor settings
    }, []);

    useEffect(() => {
        const subscription = watch(handleChange);
        return () => subscription.unsubscribe();
    }, [watch, handleChange]);

    const {field} = useController({name: 'pathWhitelist', control});

    return (
        <form className={cn(null, [className])}>
            {/* TODO i18n */}
            <Text variant="subheader-3">
                Generator settings
            </Text>

            <div className={cn('Field')}>
                <Text variant="body-2">
                    Regular expression to filter paths
                </Text>
                <TextInput
                    className={cn('TextInput')}
                    size="m"
                    placeholder="^/user"
                    name={field.name}
                    value={field.value}
                    ref={field.ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            </div>
        </form>
    );
};
