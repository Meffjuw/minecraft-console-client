export interface ISideNavElement {
  name: string;
  text: string;
  type: string;
}

export interface ISideNavModule extends ISideNavElement {
  menus: ISideNavMenu[];
}

export interface ISideNavMenu extends ISideNavElement {
  items: ISideNavMenuItem[];
}

export interface ISideNavMenuItem extends ISideNavElement {

}