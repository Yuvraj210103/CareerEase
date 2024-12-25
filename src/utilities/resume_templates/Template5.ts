import {
  IUserProfileCertificationsDetails,
  IUserProfileCustomSections,
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { formatDate } from "../misc";
import { TemplateArgs } from "./TemplateGenerate";

const template5 = ({ UserProfile }: TemplateArgs) => {
  const personalDetails = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div style="text-align:left; background-color:#fffacd; padding:10px; border:1px solid #deb887; border-radius:10px;">
      <div style="font-size:28px; font-weight:bold; color:#8b0000;">${
        personalDetails.UserFullName
      }</div>
      <p>${personalDetails.UserPhone} | <a href="mailto:${
      personalDetails.UserEmail
    }" style="color:#8b0000;">${personalDetails.UserEmail}</a></p>
      <p>${personalDetails.UserAddress || ""}</p>
    </div>`;
    return html;
  };

  const summary = (summary: string | null) => {
    const html = `<div style="margin-top:20px;">
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Summary</div>
      <hr>
      <p>${summary || ""}</p>
    </div>`;
    return summary ? html : "";
  };

  const skills = (skills: IUserProfileSkillsChildCollection[]) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Skills</div>
      <hr>
      <ul style="list-style-type:circle; padding-left:20px;">
        ${skills.map((s) => `<li>${s.UserSkillName}</li>`).join("")}
      </ul>
    </div>`;
    return html;
  };

  const workExperience = (
    workExp: IUserProfileWorkExperienceChildCollection[]
  ) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Experience</div>
      <hr>
      ${workExp
        .map(
          (res) => `<div>
            <div style="font-size:18px; font-weight:600; color:#6a5acd;">${
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
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Projects</div>
      <hr>
      ${projects
        .map(
          (project) => `<div>
            <div style="font-size:18px; font-weight:600; color:#6a5acd;">${
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
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Education</div>
      <hr>
      ${education
        .map(
          (edu) => `<div>
            <div style="font-size:18px; font-weight:600; color:#6a5acd;">${
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

  const certifications = (certs: IUserProfileCertificationsDetails[]) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Certifications</div>
      <hr>
      <ul style="list-style-type:circle; padding-left:20px;">
        ${certs
          .map(
            (cert) =>
              `<li>${cert.UserCertificateName} - ${formatDate(
                cert.UserCertificateIssueDate,
                "MM/YYYY"
              )}</li>`
          )
          .join("")}
      </ul>
    </div>`;
    return html;
  };

  const usefulLinks = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:600; color:#4682b4;">Useful Links</div>
      <hr>
      <ul>
        <div>
        ${`<div><span style="font-weight:600">Portfolio: </span> <a href="${personalDetails.UserWebsite}" target="_blank">${personalDetails.UserWebsite}</a></div>`}
      </div><div>
        ${`<div><span style="font-weight:600">LinkedIn: </span> <a href="${personalDetails.UserLinkedIn}" target="_blank">${personalDetails.UserLinkedIn}</a></div>`}
      </div>
      <div>
        ${`<div><span style="font-weight:600">Github: </span> <a href="${personalDetails.UserGitHub}" target="_blank">${personalDetails.UserGitHub}</a></div>`}
      </div>
      </ul>
    </div>`;
    return html;
  };

  const customSections = (sections: IUserProfileCustomSections[]) => {
    const html = sections
      .map(
        (section) => `<div>
          <div style="font-size:22px; font-weight:600; color:#4682b4;">${section.UserProfileCustomSectionTitle}</div>
          <hr>
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
      font-family: Arial, sans-serif;
      padding: 20px;
      line-height: 1.6;
      background-color: #f5f5f5;
      color: #333333;
    }
    a {
      text-decoration: none;
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
  ${certifications(UserProfile.UserProfileCertifications || [])}
  ${usefulLinks(UserProfile.UserProfilePersonalDetails)}
  ${customSections(UserProfile.UserProfileCustomSections || [])}
</body>
</html>`;

  return html;
};

export default template5;
