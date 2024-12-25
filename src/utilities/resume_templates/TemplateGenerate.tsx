import { IUserProfilesCollection } from "../../@types/database";
import template1 from "./Template1";
import template2 from "./Template2";
import template3 from "./Template3";
import template4 from "./Template4";
import template5 from "./Template5";

export interface TemplateGenerateArgs {
  UserProfile: IUserProfilesCollection;
  selectedTemplate: number;
}

export interface TemplateArgs {
  UserProfile: IUserProfilesCollection;
}

export const templateGenerate = ({
  UserProfile,
  selectedTemplate,
}: TemplateGenerateArgs) => {
  switch (selectedTemplate) {
    case 1:
      return template1({ UserProfile });
    case 2:
      return template2({ UserProfile });
    case 3:
      return template3({ UserProfile });
    case 4:
      return template4({ UserProfile });
    case 5:
      return template5({ UserProfile });

    default:
      return template1({ UserProfile });
  }
};
