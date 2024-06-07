import SectionTitle from "../elements/SectionTitle";
import PostLayoutSStar from "./layout/PostLayoutSStar";
import PostLayoutThree from "./layout/PostLayoutThree";

const PostSectionTwo = ({ postData }) => {

  const storyPost = postData.filter(post => post.story === true);

  return (
    <div className="section-gap section-gap-top__with-text top-stories bg-grey-dark-one" >
      <div className="container">
        <SectionTitle title="Top Star"  pClass="title-white m-b-xs-40" />
        <div className="row">
          <div className="col-lg-8">
          	
				<PostLayoutThree postSizeLg={true} />

          </div>
		  <div className="col-lg-4">
      <PostLayoutSStar />

		  </div>
        </div>
      </div>  
    </div>
  );
};

export default PostSectionTwo;
