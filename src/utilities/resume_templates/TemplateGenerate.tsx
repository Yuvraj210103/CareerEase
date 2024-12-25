import {
  ISettingsCollection,
  IUserProfilesCollection,
} from "../../@types/database";
import template1 from "./Template1";

export interface TemplateGenerateArgs {
  UserProfile: IUserProfilesCollection;
  Settings?: ISettingsCollection;
}

export interface TemplateArgs {
  UserProfile: IUserProfilesCollection;
}

export const templateGenerate = ({
  Settings,
  UserProfile,
}: TemplateGenerateArgs) => {
  switch (Settings?.SettingSelectedResumeTemplate || 1) {
    case 1:
      return template1({ UserProfile });
    case 2:
      return template1({ UserProfile });

    default:
      return template1({ UserProfile });
  }
};
