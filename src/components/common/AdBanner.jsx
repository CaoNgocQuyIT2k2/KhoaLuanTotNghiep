import Image from "next/image";

const AdBanner = () => {
    return (
      <div className="add-container m-b-xs-60">
        <a href="https://themeforest.net/item/blogar-blog-magazine-wordpress-theme/30583777">
            <Image
                src="/images/clientbanner/clientbanner.jpg"
                alt="Ad Banner"
                width={728}
                height={90}
                className="rotated-image"
            />
        </a>
        <style jsx>{`
          .add-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 60px;
            text-align: center;
          }

          .rotated-image {
            transform: rotate(90deg);
            width: auto; /* Maintain aspect ratio */
            height: auto; /* Maintain aspect ratio */
          }
        `}</style>
      </div>
    );
}

export default AdBanner;
