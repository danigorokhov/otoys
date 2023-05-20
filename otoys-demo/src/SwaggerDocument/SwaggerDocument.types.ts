import {ComponentProps, PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import {Tabs} from '@gravity-ui/uikit';

export type SwaggerDocumentProps = PropsWithChildren<{}> & ClassNameProps;

type TabsProps = ComponentProps<typeof Tabs>;
export type HandleSelectTab = Required<TabsProps>['onSelectTab'];
