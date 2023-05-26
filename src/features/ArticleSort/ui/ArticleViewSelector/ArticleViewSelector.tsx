import { FC, SVGProps, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListViewIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import GridViewIconDeprecated from '@/shared/assets/icons/tiled.svg';
import ListViewIcon from '@/shared/assets/icons/burger.svg';
import GridViewIcon from '@/shared/assets/icons/tile.svg';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleView } from '../../../../entities/Article/model/types/article';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ArticleViewSelector.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticleViewSelectorProps {
    view: ArticleView;
    onViewClick?: (newView: ArticleView) => void;
    className?: string;
}

type viewSelectorsType = {
    view: ArticleView;
    icon: FC<SVGProps<SVGSVGElement>>;
};

const viewSelectors: viewSelectorsType[] = [
    {
        view: 'GRID',
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => GridViewIcon,
            off: () => GridViewIconDeprecated,
        }),
    },
    {
        view: 'LIST',
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListViewIcon,
            off: () => ListViewIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { view, onViewClick, className } = props;

    const onCLickBtn = useCallback(
        (newView: ArticleView) => () => {
            onViewClick?.(newView);
        },
        [onViewClick],
    );

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Card border="round" className={ classNames(cls.ArticleViewSelectorRedesigned, {}, [className]) }>
                    <HStack gap="8" justify="end" className={ className }>
                        { viewSelectors.map((viewType) => (
                            <Icon
                                key={ viewType.view }
                                Svg={ viewType.icon }
                                className={ classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                }) }
                                width={ 24 }
                                height={ 24 }
                                onClick={ onCLickBtn(viewType.view) }
                                hovered
                                clickable
                            />
                        )) }
                    </HStack>
                </Card>
            }
            off={
                <HStack gap="8" justify="end" className={ className }>
                    { viewSelectors.map((viewType) => (
                        <ButtonDeprecated
                            key={ viewType.view }
                            onClick={ onCLickBtn(viewType.view) }
                            theme="clear"
                            className={ classNames('', {
                                [cls.notSelected]: viewType.view !== view,
                            }) }
                        >
                            <IconDeprecated Svg={ viewType.icon } width={ 24 } height={ 24 } />
                        </ButtonDeprecated>
                    )) }
                </HStack>
            }
        />
    );
};
