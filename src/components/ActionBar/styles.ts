import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

const { palette } = getTheme();

export const rootStyle:React.CSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  height: 44,
  backgroundColor: palette.themePrimary,
};

export const buttonStyles: IButtonStyles = {
  root: {
    backgroundColor: palette.themePrimary,
    color: palette.white,
    padding: 6
  },
  icon: {
    color: palette.white
  },
  rootHovered: {
    backgroundColor: palette.themeDarkAlt,
    color: palette.white
  },
  iconHovered: {
    color: palette.white
  },
  rootPressed: {
    backgroundColor: palette.themeDarker,
    color: palette.white,
  }
};

export const tabButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: palette.themePrimary,
    color: palette.white,
    transition: 'all 0.3s'
  },
  icon: {
    color: palette.white
  },
  rootHovered: {
    backgroundColor: palette.themeDarkAlt,
    color: palette.white
  },
  iconHovered: {
    color: palette.white
  },
  rootPressed: {
    backgroundColor: palette.themeDarkAlt,
    color: palette.white,
  }
}

export const activeButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: 'white', //'rgb(244, 244, 244)',
    color: palette.themePrimary,
    transition: 'all 0.5s',
    padding: 6
  },
  icon: {
    color: palette.white
  },
  rootHovered: {
    backgroundColor: 'rgb(244, 244, 244)',
    color: palette.themePrimary,
  },
  iconHovered: {
    color: palette.white
  },
  rootPressed: {
    backgroundColor: 'rgb(244, 244, 244)',
    color: palette.themePrimary
  }
};