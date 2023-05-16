import { PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

/**
 * @deprecated
 */
export const VStack = (
    props: PropsWithChildren<Omit<FlexProps, 'direction'>>,
) => {
    const { align = 'start' } = props;
    return <Flex { ...props } direction="column" align={ align } />;
};
