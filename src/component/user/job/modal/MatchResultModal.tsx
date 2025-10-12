import React, { useEffect, useState } from "react";
import Dialog from "../../../common/modals/Dialog";
import { IJobs, IMatchResult } from "../../../../@types/api.response";
import { useAuthState, useUIState } from "../../../../store";
import { errorHandler } from "../../../../utilities/CustomError";
import { profileMatching } from "../../../../API/ProfileMatching";

interface IMatchResultModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  job: IJobs | null;
}

const MatchResultModal = ({
  opened,
  setOpened,
  job,
}: IMatchResultModalProps) => {
  const { userProfile } = useAuthState();

  const { setLoading } = useUIState();

  const [matchResult, setMatchResult] = useState<IMatchResult | null>(null);

  useEffect(() => {
    const fetchMatchResult = async () => {
      if (!userProfile || !job) return;
      try {
        setLoading(true);

        const res = await profileMatching({ job, user: userProfile });

        console.log(res.data);

        setMatchResult(res.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        errorHandler(error);
      }
    };

    fetchMatchResult();
  }, [job]);

  if (!matchResult)
    return (
      <Dialog
        showBottomTool={false}
        opened={opened}
        setOpened={setOpened}
        title="Your match result"
        size="80%"
      >
        <div></div>
      </Dialog>
    );

  return (
    <Dialog
      showBottomTool={false}
      opened={opened}
      setOpened={setOpened}
      title="Your match result"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={
                2 * Math.PI * 50 * (1 - matchResult.matchScore / 100)
              }
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-blue-600">
              {matchResult.matchScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Experience Match</p>
          <p className="text-gray-600">{matchResult.experienceMatch}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Education Match</p>
          <p className="text-gray-600">{matchResult.educationMatch}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Semantic Similarity</p>
          <p className="text-gray-600">
            {(matchResult.details.semanticSimilarity * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Skill Overlap</p>
          <p className="text-gray-600">
            {(matchResult.details.skillOverlap * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Experience (User)</p>
          <p className="text-gray-600">
            {matchResult.details.userExperienceYears} years
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Experience (Required)</p>
          <p className="text-gray-600">
            {matchResult.details.requiredYears} years
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">User Degree</p>
          <p className="text-gray-600">
            {matchResult.details.userDegree || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="font-medium text-gray-700">Required Degree</p>
          <p className="text-gray-600">
            {matchResult.details.requiredDegree || "N/A"}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Matched Skills
        </h3>
        {matchResult.matchedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchResult.matchedSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No skills matched</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Missing Skills
        </h3>
        {matchResult.missingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchResult.missingSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No missing skills</p>
        )}
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Suggestions
        </h3>
        <ul className="space-y-2">
          {matchResult.suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-700 text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};

export default MatchResultModal;
