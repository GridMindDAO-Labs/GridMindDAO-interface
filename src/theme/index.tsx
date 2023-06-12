import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { Colors, MediaWidthTypes } from './styled'
import { selectThemeBoolean } from '@/store/theme'

const MEDIA_WIDTHS: MediaWidthTypes = {
  xs: 576,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  mxl: 1334,
  xxl: 1600,
  maxl: 1920,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  size === 'xs'
    ? ((accumulator as any)[size] = (a: any, b: any, c: any) => css`
        @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
          ${css(a, b, c)}
        }
      `)
    : ((accumulator as any)[size] = (a: any, b: any, c: any) => css`
        @media (min-width: ${(MEDIA_WIDTHS as any)[size]}px) {
          ${css(a, b, c)}
        }
      `)
  return accumulator
}, {}) as any

const themeColor = '#FBB665'
const white = '#FFFFFF'
const black = '#333'

export const colors = (darkMode: boolean): Colors => {
  return {
    white,
    black,
    themeColor,
    line: darkMode ? '#f0f0f0' : '#f0f0f0',
    gary: darkMode ? '#c8c8d9' : '#c8c8d9',
    bgColor1: darkMode ? '#206864' : '#206864',
    bgColor2: darkMode ? '#D8CAAF' : '#D8CAAF',
  }
}

export const theme = (darkMode: boolean): DefaultTheme => {
  return {
    ...colors(darkMode),
    mediaWidth: mediaWidthTemplates,
    height: document.documentElement.clientHeight || document.body.clientHeight,
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }, props: any) => {
  const thmemBoolean = useSelector(selectThemeBoolean)
  const darkMode = thmemBoolean
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}
