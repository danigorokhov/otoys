import React, { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Loader } from '@gravity-ui/uikit';
import {cn} from './App.cn';
import {Header} from '../Header';
import {Playground} from '../Playground';
import { $fetchUserMetaStatus, fetchUserMetaFx } from '../utils/userMeta';
import './App.css';
import '../utils/i18n/i18n.models/init';
import '../utils/userMeta/userMeta.models/init';

export const App: FC = () => {
    const [fetchUserMetaStatus, fetchUserMeta] = useUnit([$fetchUserMetaStatus, fetchUserMetaFx]);

    useEffect(() => {
        fetchUserMeta();
    }, [fetchUserMeta]);

    const isSuccess = fetchUserMetaStatus === 'done';
    const isLoading = fetchUserMetaStatus === 'pending';

    return (
        <div className={cn({ loading: isLoading })}>
            {isSuccess && (
                <>
                    <Header />
                    <Playground />
                    {/*
                    <FeedbackControl />
                    */}
                </>
            )}
            {isLoading && (
                <Loader size="m" />
            )}
        </div>
    );
};
