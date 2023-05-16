import { PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

/**
 * @deprecated
 */
export const HStack = (
    props: PropsWithChildren<Omit<FlexProps, 'direction'>>,
) => <Flex direction="row" { ...props } />;
