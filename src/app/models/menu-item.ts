export interface MenuItem {
  isMenu: boolean;
  parentMenu: string;
  routeName: string;
  sidebarName: string;
  icon_0: string;
  icon_1: string;
  name: string;
  children?: MenuItem[];
}
