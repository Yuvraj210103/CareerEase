import {
  IUserProfileCustomSections,
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { formatDate } from "../misc";
import { TemplateArgs } from "./TemplateGenerate";

const template3 = ({ UserProfile }: TemplateArgs) => {
  const personalDetails = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div style="text-align:center;">
      <div style="font-size:24px; font-weight:bold;">${
        personalDetails.UserFullName
      }</div>
      <p>${personalDetails.UserPhone} | <a href="mailto:${
      personalDetails.UserEmail
    }">${personalDetails.UserEmail}</a></p>
      <p>${personalDetails.UserAddress || ""}</p>
    </div>`;
    return html;
  };

  const summary = (summary: string | null) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Summary</div>
      <p>${summary || ""}</p>
    </div>`;
    return summary ? html : "";
  };

  const skills = (skills: IUserProfileSkillsChildCollection[]) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Skills</div>
      <ul style="list-style-type:square;">
        ${skills.map((s) => `<li>${s.UserSkillName}</li>`).join("")}
      </ul>
    </div>`;
    return html;
  };

  const workExperience = (
    workExp: IUserProfileWorkExperienceChildCollection[]
  ) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Experience</div>
      ${workExp
        .map(
          (res) => `<div>
            <div style="font-size:18px; font-weight:bold;">${
              res.UserWorkExpJobTitle
            }</div>
            <p>${res.UserWorkExpCompanyName} (${res.UserWorkExpLocation})</p>
            <p>${formatDate(res.UserWorkExpStartDate, "MM/YYYY")} - ${
            res.UserWorkExpEndDate
              ? formatDate(res.UserWorkExpEndDate, "MM/YYYY")
              : "Present"
          }</p>
            <p>${res.UserWorkExpDescription || ""}</p>
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const projectDetails = (projects: IUserProfileProjectsDetails[]) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Projects</div>
      ${projects
        .map(
          (project) => `<div>
            <div style="font-size:18px; font-weight:bold;">${
              project.UserProjectTitle
            }</div>
            <p>${project.UserProjectDescription}</p>
            <p>Technologies Used: ${project.UserProjectTechnologies.join(
              ", "
            )}</p>
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const educationDetails = (
    education: IUserProfileEducationDetailsChildCollection[]
  ) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Education</div>
      ${education
        .map(
          (edu) => `<div>
            <div style="font-size:18px; font-weight:bold;">${
              edu.UserEducationDegree
            }</div>
            <p>${edu.UserEducationInstitution}</p>
            <p>${formatDate(
              edu.UserEducationStartDate,
              "MM/YYYY"
            )} - ${formatDate(edu.UserEducationEndDate, "MM/YYYY")}</p>
            <p>Grade: ${edu.UserEducationGrade || "N/A"}</p>
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const usefulLinks = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold; text-decoration:underline;">Useful Links</div>
      <div>
        ${`<div><span style="font-weight:600">Portfolio: </span> <a href="${personalDetails.UserWebsite}" target="_blank">${personalDetails.UserWebsite}</a></div>`}
      </div><div>
        ${`<div><span style="font-weight:600">LinkedIn: </span> <a href="${personalDetails.UserLinkedIn}" target="_blank">${personalDetails.UserLinkedIn}</a></div>`}
      </div>
      <div>
        ${`<div><span style="font-weight:600">Github: </span> <a href="${personalDetails.UserGitHub}" target="_blank">${personalDetails.UserGitHub}</a></div>`}
      </div>
    </div>`;
    return html;
  };

  const customSections = (sections: IUserProfileCustomSections[]) => {
    const html = sections
      .map(
        (section) => `<div style="margin-top:10px;">
          <div style="font-size:22px; font-weight:bold; text-decoration:underline;">${section.UserProfileCustomSectionTitle}</div>
          <p>${section.UserProfileCustomSectionContent}</p>
        </div>`
      )
      .join("");
    return html;
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Verdana, sans-serif;
      padding: 20px;
      line-height: 1.8;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  ${personalDetails(UserProfile.UserProfilePersonalDetails)}
  ${summary(UserProfile.UserProfilePersonalDetails.UserSummary || null)}
  ${skills(UserProfile.UserProfileSkills)}
  ${workExperience(UserProfile.UserProfileWorkExperience)}
  ${projectDetails(UserProfile.UserProfileProjects)}
  ${educationDetails(UserProfile.UserProfileEducationDetails)}
  ${usefulLinks(UserProfile.UserProfilePersonalDetails || [])}
  ${customSections(UserProfile.UserProfileCustomSections || [])}
</body>
</html>`;

  return html;
};

export default template3;
