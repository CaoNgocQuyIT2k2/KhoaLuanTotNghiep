import SectionTitle from "../elements/SectionTitle";
import PostLayoutNewest from "./layout/PostLayoutNewest";
import PostLayoutOne from "./layout/PostLayoutOne";


const PostSectionOne = ({ postData }) => {


    return (
      <div className="recent-news-wrapper section-gap p-t-xs-15 p-t-sm-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
            <PostLayoutOne/>
            </div>
            <div className="col-lg-6">
              <div className="axil-recent-news">
                <SectionTitle
                  title="Recent News"
                 
                  pClass="m-b-xs-30"
                />
                <PostLayoutNewest />
 {/* Slicing the array from index 1 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default PostSectionOne;