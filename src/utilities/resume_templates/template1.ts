import {
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { formatDate } from "../misc";
import { TemplateArgs } from "./TemplateGenerate";

const template1 = ({ UserProfile }: TemplateArgs) => {
  const personalDetails = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
     <div style="font-size:18px; font-weight:600;">${
       personalDetails.UserFullName
     }</div>
    
    <hr>
    <p>${personalDetails?.UserPhone || ""}  <a href="mailto:${
      personalDetails?.UserEmail || ""
    }">| ${personalDetails?.UserEmail || ""}</a> | ${
      personalDetails?.UserAddress || "" || ""
    } </p></div>`;
    return html;
  };

  const summary = (summary: string | null) => {
    const html = `
    <div>
        <div style="font-size:18px; font-weight:600;">Summary</div>
        <hr>
        <p>
          ${summary}
        </p>
    </div>`;

    return summary ? html : "";
  };

  const skills = (skills: IUserProfileSkillsChildCollection[]) => {
    const html = `<div>
    <div style="font-size:18px; font-weight:600;">Technical Skills</div>
        <hr>
        <p>${skills.map((s) => s.UserSkillName).join(" , ")}</p>
    </div>`;

    return html;
  };

  const workExperience = (
    workExp: IUserProfileWorkExperienceChildCollection[]
  ) => {
    const html = ` <div>
       
    <div style="font-size:18px; font-weight:600;">Relevant Experience</div>

        <hr>
        ${workExp
          .map(
            (res) => `<p> <span style="font-size:16px; font-weight:600;">${
              res.UserWorkExpCompanyName
            } | ${
              res?.UserWorkExpLocation ? res.UserWorkExpLocation : ""
            }</span><br>
        <span style="font-size:16px; font-weight:600;">${
          res.UserWorkExpJobTitle
        } | ${formatDate(res.UserWorkExpStartDate, "MM/YYYY")} - ${
              res.UserWorkExpEndDate
                ? formatDate(res.UserWorkExpEndDate, "MM/YYYY")
                : "Working"
            }</span><br> ${
              res?.UserWorkExpDescription ? res.UserWorkExpDescription : ""
            }
        </p>`
          )
          .join("")}
        
    </div>`;

    return html;
  };

  const projectDetails = (projects: IUserProfileProjectsDetails[]) => {
    const html = `<div>
        <div style="font-size:18px; font-weight:600;">Projects</div>
        <hr>
        
        ${projects
          .map(
            (res) =>
              `<div>
                <p style="display:flex; flex-direction:column;">
                  <span style="font-size:16px; font-weight:600;">
                      ${res.UserProjectTitle}:
                  </span>
                  <span style="margin-top:8px;">
                    ${res.UserProjectDescription}
                  </span> 
                </p>
               </div>`
          )
          .join("")}
            
    </div>`;

    return projects.length > 0 ? html : "";
  };

  const educationDetails = (
    education: IUserProfileEducationDetailsChildCollection[]
  ) => {
    const html = `<div>
          <div style="font-size:18px; font-weight:600;">Education</div>
            <hr>

            ${education
              .map(
                (res) => `<p> 
                <span style="font-size:16px; font-weight:600;">${
                  res.UserEducationInstitution
                }</span>

                <br>

                <span style="font-size:16px; font-weight:600;">
                ${res.UserEducationDegree} | ${formatDate(
                  res.UserEducationStartDate,
                  "MM/YYYY"
                )} - ${formatDate(res.UserEducationEndDate, "MM/YYYY")}</span>
                <br>
                <span style="font-size:16px; font-weight:600;">
                Grade:  ${res.UserEducationGrade}
                </span>

                <br>
                ${
                  res.UserEducationDescription
                    ? res.UserEducationDescription
                    : ""
                }

            </p>`
              )
              .join("")}

           

        </div>`;

    return html;
  };

  const usefulLinks = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
             <div style="font-size:18px; font-weight:600;">Useful Links</div>
            <hr>
            <span>
            ${
              personalDetails.UserWebsite
                ? `<span style="font-size:16px; font-weight:600;">Portfolio website:</span> <a href="${personalDetails.UserWebsite}">${personalDetails.UserWebsite}</a></span>`
                : ""
            }  <br><br>
            ${
              personalDetails.UserLinkedIn
                ? `<span style="font-size:16px; font-weight:600;">LinkedIn:</span> <a href="${personalDetails.UserLinkedIn}">${personalDetails.UserLinkedIn}</a></span>`
                : ""
            }<br><br>
           ${
             personalDetails.UserGitHub
               ? `<span style="font-size:16px; font-weight:600;">Github:</span> <a href="${personalDetails.UserGitHub}">${personalDetails.UserGitHub}</a></span>`
               : ""
           }
        </div>`;

    return html;
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding:20px;
          }
        </style>
    <title>${UserProfile.UserProfilePersonalDetails.UserFullName}</title>
</head>
<body>
    ${personalDetails(UserProfile.UserProfilePersonalDetails)}

    ${summary(UserProfile.UserProfilePersonalDetails.UserSummary || null)}
    
    ${skills(UserProfile.UserProfileSkills)}

    ${workExperience(UserProfile.UserProfileWorkExperience)}

    ${projectDetails(UserProfile.UserProfileProjects)}
   
    ${educationDetails(UserProfile.UserProfileEducationDetails)}

    ${usefulLinks(UserProfile.UserProfilePersonalDetails)}
    
    
</body>
</html>`;

  return html;
};

export default template1;
