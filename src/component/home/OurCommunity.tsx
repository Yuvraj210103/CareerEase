import { ConstSocialMediaLinks } from "../constants/ConstSocialMediaLinks";

const OurCommunity = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-8 px-8">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="font-bold text-3xl">Welcome to Our Community</div>
        <div className="text-center font-medium text-lg text-textSecondary">
          Join a supportive community of passionate enthusiasts, We are thrilled
          to have you join us on this exciting journey towards achieving your
          professional goals.
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-2xl">
        <a
          href={ConstSocialMediaLinks.LINKEDIN}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="assets\social_media_logos\linkedin.svg"
            alt=""
            className="size-[60px]"
          />
        </a>
        <a
          href={ConstSocialMediaLinks.WHATSAPP}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="assets\social_media_logos\whatsapp.svg"
            alt=""
            className="size-[60px]"
          />
        </a>

        <a
          href={ConstSocialMediaLinks.FACEBOOK}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="assets\social_media_logos\facebook.svg"
            alt=""
            className="size-[60px]"
          />
        </a>
        <a
          href={ConstSocialMediaLinks.INSTAGRAM}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="assets\social_media_logos\instagram.svg"
            alt=""
            className="size-[60px]"
          />
        </a>
        <a
          href={ConstSocialMediaLinks.TWITTER}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="assets\social_media_logos\twitter.svg"
            alt=""
            className="size-[60px]"
          />
        </a>
      </div>
    </div>
  );
};

export default OurCommunity;
