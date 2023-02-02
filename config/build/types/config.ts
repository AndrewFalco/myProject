export type BuildMode = 'development' | 'production';

export interface BuildPaths {
    entry: string;
    // readonly: boolean;
    // output: string
    build: string;
    html: string;
};

export interface BuildEnv {
    mode: BuildMode;
    port: number;
};

export type BuildOptions = {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean,
    port: number,
};