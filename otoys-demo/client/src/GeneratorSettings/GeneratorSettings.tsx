import React, {FC, useCallback, useEffect} from 'react';
import { GeneratorSettingsProps, HandleChange, GeneratorSettingsValues } from './GeneratorSettings.types';
import {cn} from './GeneratorSettings.cn';
import './GeneratorSettings.css';
import { Text, TextInput } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';
import {useUnit} from 'effector-react';
import {$generatorSettings, generatorSettingsSet} from './GeneratorSettings.models';

import './GeneratorSettings.models/init';

export const GeneratorSettings: FC<GeneratorSettingsProps> = props => {
    const {
        className,
    } = props;

    const [generatorSettingsValue, setGeneratorSettingsValue] = useUnit([$generatorSettings, generatorSettingsSet]);

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
                {/* Generator settings */}
                Настройки генератора
            </Text>

            <div className={cn('Field')}>
                {/* TODO rename to type prefix for demo!!!!!!! */}
                {/* <Text variant="body-2">
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
                /> */}
                <Text variant="body-2">
                    {/* Type suffix */}
                    Добавление суффикса для типов
                </Text>
                <TextInput
                    className={cn('TextInput')}
                    size="m"
                    placeholder="DTO"
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
