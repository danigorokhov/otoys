import { createEffect, createEvent, createStore } from 'effector';
import {status} from 'patronum';

type UserMeta = {
    id: number;
    document: {
        content: string;
    };
} | null;

export const $userMeta = createStore<UserMeta>(null);
export const userMetaChanged = createEvent<UserMeta>();

type ApiMetaResponse = UserMeta;

type FetchUserMetaFx = () => Promise<UserMeta>;

export const fetchUserMetaFx = createEffect<FetchUserMetaFx>(async () => {
    const response = await fetch('/api/meta', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json() as ApiMetaResponse;

    return result;
});

export const $fetchUserMetaStatus = status({
    effect: fetchUserMetaFx,
    defaultValue: 'pending',
});
