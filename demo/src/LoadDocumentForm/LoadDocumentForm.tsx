import React, {FC, useCallback} from 'react';
import { LoadDocumentFormProps, LoadDocumentFormValues, HandleSubmit } from './LoadDocumentForm.types';
import {DOCUMENT_TYPE_REMOTE, DOCUMENT_TYPE_FILE, DOCUMENT_TYPE_OPTIONS, LOAD_DOCUMENT_FORM_DEFAULT_VALUES} from './LoadDocumentForm.const';
import {cn} from './LoadDocumentForm.cn';
import './LoadDocumentForm.css';
import { Text, TextInput, RadioButton } from '@gravity-ui/uikit';
import {useForm, useController} from 'react-hook-form';
import { FileInput } from '../FileInput';
import { SubmitControl } from '../SubmitControl';

export const LoadDocumentForm: FC<LoadDocumentFormProps> = props => {
    const {
        className,
    } = props;

    const {control, handleSubmit: handleSubmitFactory} = useForm<LoadDocumentFormValues>({
        defaultValues: LOAD_DOCUMENT_FORM_DEFAULT_VALUES,
    });

    const handleSubmit = useCallback<HandleSubmit>(_formValues => {
        console.log(_formValues);
        // TODO handle _formValues of editor settings
    }, []);

    const {field: documentTypeField} = useController({ name: 'documentType', control });
    const {field: urlField} = useController({ name: 'url', control });
    const {field: fileField} = useController({ name: 'file', control });

    return (
        <form onSubmit={handleSubmitFactory(handleSubmit)} className={cn(null, [className])}>
            <Text variant="subheader-3">
                Load document
            </Text>

            {/* TODO i18n */}
            <div className={cn('Field')}>
                <Text variant="body-2">
                    Type of document loading
                </Text>
                <RadioButton
                    className={cn('RadioButton')}
                    size="m"
                    options={DOCUMENT_TYPE_OPTIONS}
                    name={documentTypeField.name}
                    value={documentTypeField.value}
                    ref={documentTypeField.ref}
                    onBlur={documentTypeField.onBlur}
                    onUpdate={documentTypeField.onChange}
                />
            </div>

            {documentTypeField.value === DOCUMENT_TYPE_REMOTE && (
                <div className={cn('Field')}>
                    <Text variant="body-2">
                        URL to the OpenAPI document
                    </Text>
                    <TextInput
                        className={cn('TextInput')}
                        placeholder="https://petstore3.swagger.io/api/v3/openapi.json"
                        size="m"
                        name={urlField.name}
                        value={urlField.value}
                        ref={urlField.ref}
                        onBlur={urlField.onBlur}
                        onChange={urlField.onChange}
                    />
                </div>
            )}
            {documentTypeField.value === DOCUMENT_TYPE_FILE && (
                <div className={cn('Field')}>
                    <Text variant="body-2">
                        OpenAPI document as a file
                    </Text>
                    <FileInput
                        name={fileField.name}
                        value={fileField.value}
                        ref={fileField.ref}
                        onBlur={fileField.onBlur}
                        onChange={fileField.onChange}
                        accept="application/json, application/yaml, application/yml, text/yaml, text/yml, text/x-yaml, application/x-yaml, application/x-yml"
                    />
                </div>
            )}

            {/* TODO validate form values */}
            <SubmitControl className={cn('Submit')} text="Load" />
        </form>
    );
};
