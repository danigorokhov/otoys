import {sample} from 'effector';
import {$editorSettings, editorSettingsChanged} from '.';

sample({
    clock: editorSettingsChanged,
    target: $editorSettings,
});
