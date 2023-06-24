import React, {FC, useCallback, useEffect, useMemo} from 'react';
import { GeneratorSettingsProps, HandleChange, GeneratorSettingsValues } from './GeneratorSettings.types';
import {cn} from './GeneratorSettings.cn';
import './GeneratorSettings.css';
import {
    ControlGroupOption,
    RadioButton,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';
import {useUnit} from 'effector-react';
import { useI18n } from '../utils/i18n';
import {$generatorSettings, generatorSettingsSet} from './GeneratorSettings.models';
import { getI18nKeysetFn } from './GeneratorSettings.i18n';
import { TYPE_OTOYS, TYPE_SWAGGER_TYPESCRIPT_API } from './GeneratorSettings.const';

import './GeneratorSettings.models/init';

export const GeneratorSettings: FC<GeneratorSettingsProps> = props => {
    const {
        className,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    const typeOptions: ControlGroupOption[] = useMemo(() => [
        {
            content: 'otoys',
            value: TYPE_OTOYS,
        },
        {
            content: 'swagger-typescript-api',
            value: TYPE_SWAGGER_TYPESCRIPT_API,
        },
    ], []);

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

    const {field: fieldType} = useController({name: 'type', control});
    const {field: fieldPathWhitelist} = useController({name: 'pathWhitelist', control});
    const {field: fieldTypeSuffix} = useController({name: 'typeSuffix', control});

    return (
        <form className={cn(null, [className])}>
            <Text variant="subheader-3">
                {i18n('title')}
            </Text>

            <div className={cn('Field')}>
                <Text variant="body-2">
                    {i18n('field.type.label')}
                </Text>
                <RadioButton
                    className={cn('RadioButton')}
                    size="m"
                    options={typeOptions}
                    name={fieldType.name}
                    value={fieldType.value}
                    ref={fieldType.ref}
                    onBlur={fieldType.onBlur}
                    onUpdate={fieldType.onChange}
                />
            </div>

            {fieldType.value === TYPE_OTOYS && (
                <div className={cn('Field')}>
                    <Text variant="body-2">
                        {i18n('field.otoys.pathWhitelist.label')}
                    </Text>
                    <TextInput
                        className={cn('TextInput')}
                        size="m"
                        placeholder="^/user"
                        name={fieldPathWhitelist.name}
                        value={fieldPathWhitelist.value}
                        ref={fieldPathWhitelist.ref}
                        onUpdate={fieldPathWhitelist.onChange}
                        onBlur={fieldPathWhitelist.onBlur}
                    />
                </div>
            )}

            {fieldType.value === TYPE_SWAGGER_TYPESCRIPT_API && (
                <div className={cn('Field')}>
                    <Text variant="body-2">
                        {i18n('field.swagger-typescript-api.typeSuffix.label')}
                    </Text>
                    <TextInput
                        className={cn('TextInput')}
                        size="m"
                        placeholder={i18n('field.swagger-typescript-api.typeSuffix.placeholder')}
                        name={fieldTypeSuffix.name}
                        value={fieldTypeSuffix.value}
                        ref={fieldTypeSuffix.ref}
                        onUpdate={fieldTypeSuffix.onChange}
                        onBlur={fieldTypeSuffix.onBlur}
                    />
                </div>
            )}
        </form>
    );
};
