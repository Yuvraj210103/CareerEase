import { useAuthState } from "../../../store";
import { templateGenerate } from "../../../utilities/resume_templates/TemplateGenerate";

const ResumeTemplates = () => {
  const { userProfile } = useAuthState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeHTML = (frame: any) => {
    if (!userProfile) return;
    const resumeHtml = templateGenerate({ UserProfile: userProfile });
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
          <div className="py-4 border-b px-4 font-semibold hover:bg-onHoverBg cursor-pointer duration-200">
            Template 1
          </div>
          <div className="py-4 border-b px-4 font-semibold hover:bg-onHoverBg cursor-pointer duration-200">
            Template 2
          </div>
        </div>
        <div className="bg-surface h-full w-[80%] p-4">
          <iframe
            className="bg-surfaceLight "
            ref={writeHTML}
            style={{ minWidth: "100%", height: "100%" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
