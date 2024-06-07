import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionThree = () => {

  return (
    <div className="section-gap section-gap-top__with-text trending-stories">
      <div className="container">
        <SectionTitle title="Trending Stories" />
        <div className="">
            <div className="col-lg-12" >
              <PostLayoutTwo />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionThree;
