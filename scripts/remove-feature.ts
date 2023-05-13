import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
    throw new Error('Select feature flag name.');
}

if (!featureState) {
    throw new Error('Select feature state (on/off).');
}

if (featureState !== 'off' && featureState !== 'on') {
    throw new Error('Select feature state (on/off).');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node): boolean => {
    let isToggle = false;

    node.forEachChild(child => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggle = true;
        }
    })

    return isToggle;
}

files.forEach((file) => {
    file.forEachDescendant(node => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

            if (!objectOptions) return;

            const onFP = objectOptions.getProperty('on');
            const offFP = objectOptions.getProperty('off');
            const featureNameProperty = objectOptions.getProperty('name');

            const onFunction = onFP?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFunction = offFP?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText().slice(1, -1);

            if (featureName !== removedFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '');
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '');
            }
        }
    })
});

project.save();
