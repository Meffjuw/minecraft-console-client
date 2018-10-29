export interface IDashboardItem {
  name: string;
  label: string;
  desc: string;
  icon: string;
}

export interface IHomeData {
  id: string;
  name: string;
  desc: string;
  version: string;
  isForge: boolean;
  forgeVersion: string;
}

export interface IFormControlProps {
  controlId: string;
  formId: string;
  enabled: boolean;
}