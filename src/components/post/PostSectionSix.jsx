import { slugify } from "../../utils";
import SectionTitle from "../elements/SectionTitle";

const PostSectionSix = ({postData}) => {

    const foodPost = postData.filter(post => slugify(post.cate) === 'food' || slugify(post.cate) === 'drink');

    return ( 
        <div className="related-post p-b-xs-30">
            <div className="container">
                <SectionTitle title="Food &amp; Drink" btnText="All FOOD &amp; DRINK"/>
                <div className="grid-wrapper">
            
                </div>
            </div>
        </div>

     );
}
 
export default PostSectionSix;