import { IoCreateOutline } from "react-icons/io5";
import { useAuthState } from "../../../store";
import { templateGenerate } from "../../../utilities/resume_templates/TemplateGenerate";
import { useEffect, useState } from "react";
import DbUser from "../../../firebase/DB/DbUser";
import { errorHandler } from "../../../utilities/CustomError";

const templates = [
  {
    title: "Template 1",
    id: "template_1",
  },
  { title: "Template 2", id: "template_2" },
];

const ResumeTemplates = () => {
  const { userProfile, settings, setSettings } = useAuthState();

  const [selectedTemplate, setSelectedTemplate] = useState(
    settings?.SettingSelectedResumeTemplate || 1
  );

  useEffect(() => {
    if (
      !settings ||
      selectedTemplate === settings?.SettingSelectedResumeTemplate
    )
      return;
    DbUser.updateSetting(settings?.SettingId, {
      SettingSelectedResumeTemplate: selectedTemplate,
    })
      .then(() => {
        setSettings({
          ...settings,
          SettingSelectedResumeTemplate: selectedTemplate,
        });
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err);
      });
  }, [selectedTemplate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeHTML = (frame: any) => {
    if (!userProfile || !settings) return;
    const resumeHtml = templateGenerate({
      UserProfile: userProfile,
      Settings: settings,
    });
    if (!frame) {
      return;
    }
    const doc = frame.contentDocument;
    doc.open();
    doc.write(resumeHtml);
    doc.close();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start h-[calc(100vh-95px)] gap-4">
        <div className="bg-surface h-full w-[20%] py-4 flex flex-col">
          <div className="font-bold text-lg text-textSecondary mb-4 px-4">
            Select Template
          </div>
          {templates.map((res, idx) => {
            return (
              <div
                key={res.id}
                className={`py-4 border-b px-4 font-semibold  cursor-pointer duration-200 ${
                  idx + 1 === selectedTemplate
                    ? "bg-onHoverBg"
                    : "hover:bg-onHoverBg/50"
                }`}
                onClick={() => setSelectedTemplate(idx + 1)}
              >
                {res.title}
              </div>
            );
          })}
        </div>
        <div className="bg-surface h-full w-[80%] p-4">
          {userProfile ? (
            <iframe
              className="bg-surfaceLight "
              ref={writeHTML}
              style={{ minWidth: "100%", height: "100%" }}
            ></iframe>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <IoCreateOutline className="text-7xl" />
                <div className="text-textSecondary font-medium">
                  Please create profile first to view resume templates
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
