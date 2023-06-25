import React, {FC, useCallback, useEffect, useMemo} from 'react';
import { EditorSettingsProps, EditorSettingsValues, HandleChange } from './EditorSettings.types';
import {LANGUAGE_JSON, LANGUAGE_YAML} from './EditorSettings.const';
import {cn} from './EditorSettings.cn';
import './EditorSettings.css';
import { RadioButton, Text, ControlGroupOption } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';
import { getI18nKeysetFn } from './EditorSettings.i18n';
import { useI18n } from '../utils/i18n';
import { useUnit } from 'effector-react';
import { $editorSettings, editorSettingsChanged } from './EditorSettings.models';

import './EditorSettings.models/init';

export const EditorSettings: FC<EditorSettingsProps> = props => {
    const {
        className,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    const languageOptions: ControlGroupOption[] = useMemo(() => [
        {
            content: i18n('field.lang.option.json'),
            value: LANGUAGE_JSON,
        },
        {
            content: i18n('field.lang.option.yaml'),
            value: LANGUAGE_YAML,
        },
    ], [i18n]);

    const [editorSettings, setEditorSettings] = useUnit([$editorSettings, editorSettingsChanged]);

    const {control, watch} = useForm<EditorSettingsValues>({
        defaultValues: editorSettings,
    });

    const handleChange = useCallback<HandleChange>(formValues => {
        // TODO validate
        if (formValues.language) {
            setEditorSettings({
                language: formValues.language,
            });
        }
    }, [setEditorSettings]);

    useEffect(() => {
        const subscription = watch(handleChange);
        return () => subscription.unsubscribe();
    }, [watch, handleChange]);

    const {field} = useController({name: 'language', control});

    return (
        <form className={cn(null, [className])}>
            <Text variant="subheader-3">
                {i18n('title')}
            </Text>

            <div className={cn('Field')}>
                <Text variant="body-2">
                    {i18n('field.lang.label')}
                </Text>
                <RadioButton
                    className={cn('RadioButton')}
                    size="m"
                    options={languageOptions}
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
