import React, {FC, useCallback, useEffect} from 'react';
import { GeneratorSettingsProps, HandleChange, GeneratorSettingsValues } from './GeneratorSettings.types';
import {cn} from './GeneratorSettings.cn';
import './GeneratorSettings.css';
import { Text, TextInput } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';
import {useUnit} from 'effector-react';
import {$generatorSettings, setGeneratorSettings} from './GeneratorSettings.models';

import './GeneratorSettings.models/init';

export const GeneratorSettings: FC<GeneratorSettingsProps> = props => {
    const {
        className,
    } = props;

    const [generatorSettingsValue, setGeneratorSettingsValue] = useUnit([$generatorSettings, setGeneratorSettings]);

    const {control, watch} = useForm<GeneratorSettingsValues>({
        defaultValues: generatorSettingsValue,
    });

    const handleChange = useCallback<HandleChange>(formValues => {
        setGeneratorSettingsValue(formValues);
    }, [setGeneratorSettingsValue]);

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
                    onUpdate={field.onChange}
                    onBlur={field.onBlur}
                />
            </div>
        </form>
    );
};
