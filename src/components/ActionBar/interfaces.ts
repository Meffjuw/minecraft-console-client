export interface IActionBarButtonBase {
  id: string;
  enabled: boolean;
  text: string;
}

export interface IActionBarButton extends IActionBarButtonBase {
  icon: string;
  type: 'ActionBarButton';
  onClick?(): void;
  primary?: boolean;
}

export interface IActionBarMenuItemButton extends IActionBarButtonBase {
  icon: string;
  type: 'ActionBarMenuItemButton'
  onClick?(): void;
}

export interface IActionBarFarButton {
  id: string;
  icon: string;
  type: 'ActionBarFarButton';
  onClick?(): void;
}

export interface IActionBarGroupButton {
  text: string;
  type: 'ActionBarGroupButton'
}

export interface IActionBarGroup {
  text: string;
  buttons: IActionBarGroupButton[]
  type: 'ActionBarButtonGroup'
}

export interface IActionBarTabButton {
  id: string;
  text: string;
  groups: IActionBarGroup[];
  type: 'ActionBarTabButton'
}

export interface IActionBarDivider {
  type: 'ActionBarDivider'
}

export type IActionBarButtonElement = IActionBarButton | IActionBarMenuItemButton | IActionBarTabButton | IActionBarDivider | IActionBarFarButton;