import {sample} from 'effector';
import {$editorSettings} from '../../EditorSettings';
import {editorLangChanged} from '../../SwaggerDocumentEditor';

sample({
    clock: $editorSettings,
    fn: editorSettings => {
        return editorSettings.language;
    },
    target: editorLangChanged,
});
