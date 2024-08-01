import { ThemesEnum } from "../enums"

export interface IUserSettings {
    theme: IThemeSettings
}

interface IThemeSettings {
    theme: ThemesEnum,
    fontSize: string,
    chatWallpaper: string
}