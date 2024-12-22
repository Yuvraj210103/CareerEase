import { IUserProfileCertificationsDetails } from "../../../@types/database";
import { toDate } from "../../../utilities/misc";
import Button from "../../common/button/Button";
import InputDate from "../../common/inputs/InputDate";
import InputWithTopHeader from "../../common/inputs/InputWithTopHeader";

export interface UserProfileCertificationsDetails
  extends Omit<
    IUserProfileCertificationsDetails,
    "UserCertificateIssueDate" | "UserCertificateExpiryDate"
  > {
  UserCertificateIssueDate: Date;
  UserCertificateExpiryDate?: Date | null;
}

interface CertificationsProps {
  certificationsDetail: UserProfileCertificationsDetails[];
  setCertificationsDetail: React.Dispatch<
    React.SetStateAction<UserProfileCertificationsDetails[]>
  >;
}

const Certifications = ({
  certificationsDetail,
  setCertificationsDetail,
}: CertificationsProps) => {
  const handleAddEducation = () => {
    setCertificationsDetail([
      ...certificationsDetail,
      {
        UserCertificateIssueDate: null as unknown as Date,
        UserCertificateIssuedBy: "",
        UserCertificateName: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    if (certificationsDetail.length === 1) return;
    setCertificationsDetail(certificationsDetail.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof UserProfileCertificationsDetails,
    value: string | null | Date
  ) => {
    const updatedCheckpoints = [...certificationsDetail];
    if (
      key === "UserCertificateExpiryDate" ||
      key === "UserCertificateIssueDate"
    ) {
      updatedCheckpoints[index][key] = value as Date;
    } else {
      updatedCheckpoints[index][key] = value as string;
    }

    setCertificationsDetail(updatedCheckpoints);
  };

  console.log(certificationsDetail, "here");
  return (
    <div className="flex flex-col gap-4 bg-surface p-4 shadow rounded">
      <div className="font-semibold flex items-center gap-2 text-lg">
        Certifications Detail
      </div>
      {certificationsDetail.map((res, index) => {
        return (
          <div className="grid grid-cols-3 gap-4 bg-gray-50 border-[1.5px] border-inputBorder p-4 rounded">
            <InputWithTopHeader
              className={`mx-0`}
              label="Name"
              value={res.UserCertificateName}
              onChange={(e) =>
                handleChange(index, "UserCertificateName", e.target.value)
              }
            />
            <InputWithTopHeader
              className={`mx-0`}
              label="Issued By"
              value={res.UserCertificateIssuedBy}
              onChange={(e) =>
                handleChange(index, "UserCertificateIssuedBy", e.target.value)
              }
            />

            <InputDate
              label="Issued Date"
              value={
                res.UserCertificateIssueDate
                  ? toDate(res.UserCertificateIssueDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserCertificateIssueDate", e as Date)
              }
            />
            <InputDate
              label="Expiry Date (Optional)"
              value={
                res.UserCertificateExpiryDate
                  ? toDate(res.UserCertificateExpiryDate)
                  : null
              }
              setValue={(e) =>
                handleChange(index, "UserCertificateExpiryDate", e as Date)
              }
            />

            {certificationsDetail.length > 1 && (
              <Button
                label="Delete"
                type="red"
                className="col-span-3 w-fit px-6"
                onClick={() => handleRemoveEducation(index)}
              />
            )}
          </div>
        );
      })}
      <Button
        label="Add New"
        onClick={handleAddEducation}
        type="black"
        className="w-fit px-6"
      />
    </div>
  );
};

export default Certifications;
