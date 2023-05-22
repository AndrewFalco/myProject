import { JsxAttribute, Node, SyntaxKind } from 'ts-morph';

export const isToggleComponent = (node: Node, toggleComponentName: string) => {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
    jsxAttributes.find((node) => node.getName() === name);

const getReplaceComponent = (attribute: JsxAttribute) => {
    const value = attribute
        .getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    return value?.startsWith('(') ? value.slice(1, -1) : value;
};

export const replaceToggleComponent = (
    node: Node,
    featureState: string,
    removedFeatureName: string,
) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');

    const offValue = offAttribute && getReplaceComponent(offAttribute);
    const onValue = onAttribute && getReplaceComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};
