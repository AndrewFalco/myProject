import { Node, SyntaxKind } from 'ts-morph';

export const isToggleFunction = (
    node: Node,
    toggleFunctionName: string,
): boolean => {
    let isToggle = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === toggleFunctionName
        ) {
            isToggle = true;
        }
    });

    return isToggle;
};

export const replaceToggleFunction = (
    node: Node,
    featureState: string,
    removedFeatureName: string,
) => {
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) return;

    const onFP = objectOptions.getProperty('on');
    const offFP = objectOptions.getProperty('off');
    const featureNameProperty = objectOptions.getProperty('name');

    const onFunction = onFP?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
    const offFunction = offFP?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removedFeatureName) return;

    if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
    }

    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
    }
};
