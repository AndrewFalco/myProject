import { Project, SyntaxKind } from 'ts-morph';
import { isToggleFunction, replaceToggleFunction } from './isToggleFunction';
import { isToggleComponent, replaceToggleComponent } from './isToggleComponent';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

const toggleFunctionName = 'toggleFeature';
const toggleComponentName = 'ToggleFeature';

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

files.forEach((file) => {
    file.forEachDescendant((node) => {
        if (
            node.isKind(SyntaxKind.CallExpression) &&
            isToggleFunction(node, toggleFunctionName)
        ) {
            return replaceToggleFunction(
                node,
                featureState,
                removedFeatureName,
            );
        }

        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node, toggleComponentName)
        ) {
            return replaceToggleComponent(
                node,
                featureState,
                removedFeatureName,
            );
        }
    });
});

project.save();
