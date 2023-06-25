import { sample } from 'effector';
import { $userMeta, userMetaChanged, fetchUserMetaFx } from '.';

sample({
    clock: userMetaChanged,
    target: $userMeta,
});

sample({
    clock: fetchUserMetaFx.doneData,
    target: userMetaChanged,
});
