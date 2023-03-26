import { classNames } from 'shared/lib/classNames/classNames';
import ListViewIcon from 'shared/assets/icons/list.svg';
import GridViewIcon from 'shared/assets/icons/tiled.svg';
import { ArticleView } from 'entities/Article/model/types/article';
import { Button, Icon } from 'shared/ui';

import { ReactElement, useCallback } from 'react';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string,
    view: ArticleView,
    onViewClick?: (newView: ArticleView) => void,
}

type viewSelectorsType = {
    view: ArticleView,
    icon: ReactElement
}

const viewSelectors: viewSelectorsType[] = [
    {
        view: 'GRID',
        icon: <Icon Svg={ GridViewIcon } />,
    },
    {
        view: 'LIST',
        icon: <Icon Svg={ ListViewIcon } />,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onCLickBtn = useCallback((newView: ArticleView) => () => {
            onViewClick?.(newView);
        }, [onViewClick]);

    return (
        <div className={ classNames(cls.ArticleViewSelector, {}, [className]) }>
            { viewSelectors.map((viewType) => (
                <Button
                  key={ viewType.view }
                  onClick={ onCLickBtn(viewType.view) }
                  theme="clear"
                  className={ classNames('', { [cls.notSelected]: viewType.view !== view }) }
                >
                    { viewType.icon }
                </Button>
            )) }
        </div>
    );
};
