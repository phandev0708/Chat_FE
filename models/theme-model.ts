export interface PostTheme {
    BgImageName: string;
    BgImageFullPath: string;
    FontFamily: string;
    MainColor: string;
    IsDarkMode: boolean;
}

export interface PutTheme {
    ID: string;
    BgImageName?: string;
    BgImageFullPath?: string;
    FontFamily?: string;
    MainColor?: string;
    IsDarkMode?: boolean;
}
