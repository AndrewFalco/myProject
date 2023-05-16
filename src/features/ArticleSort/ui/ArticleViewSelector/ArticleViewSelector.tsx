import { ReactElement, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListViewIcon from '@/shared/assets/icons/list.svg';
import GridViewIcon from '@/shared/assets/icons/tiled.svg';
import { Button, HStack, Icon } from '@/shared/ui';
import { ArticleView } from '../../../../entities/Article/model/types/article';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    view: ArticleView;
    onViewClick?: (newView: ArticleView) => void;
}

type viewSelectorsType = {
    view: ArticleView;
    icon: ReactElement;
};

const viewSelectors: viewSelectorsType[] = [
    {
        view: 'GRID',
        icon: <Icon Svg={ GridViewIcon } width={ 24 } height={ 24 } />,
    },
    {
        view: 'LIST',
        icon: <Icon Svg={ ListViewIcon } width={ 24 } height={ 24 } />,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { view, onViewClick } = props;

    const onCLickBtn = useCallback(
        (newView: ArticleView) => () => {
            onViewClick?.(newView);
        },
        [onViewClick],
    );

    return (
        <HStack gap="8" justify="end">
            { viewSelectors.map((viewType) => (
                <Button
                    key={ viewType.view }
                    onClick={ onCLickBtn(viewType.view) }
                    theme="clear"
                    className={ classNames('', {
                        [cls.notSelected]: viewType.view !== view,
                    }) }
                >
                    { viewType.icon }
                </Button>
            )) }
        </HStack>
    );
};
