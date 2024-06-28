import Image from "next/image";
import { getFileContentBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import TeamOne from "../components/team/TeamOne";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import { removeDuplicates } from "../utils";

const AboutUs = ({ aboutData, allPosts }) => {

    const AuthorList = removeDuplicates(allPosts, 'author_name');

    return (
        <>
            <HeadMeta metaTitle="Về chúng tôi" />
            <HeaderOne />
            <BreadcrumbBanner pageTitle="Về chúng tôi" />
            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">
                    <figure className="m-b-xs-40">
                        <Image
                            src={aboutData.data.featuredImg}
                            height={451}
                            width={1110}
                            alt="about us"
                            className="img-fluid mx-auto"
                        />
                    </figure>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="about-us-content">
                                <div dangerouslySetInnerHTML={{ __html: aboutData.content }}></div>
                            </div>
                        </div>
                        {/* End of .col-lg-8 */}
                        <div className="col-lg-4">
                            <aside className="post-sidebar">
                                <WidgetNewsletter />
                                <WidgetSocialShare />
                                <WidgetPost dataPost={allPosts} />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <div className="axil-our-team section-gap section-gap-top__with-text bg-grey-light-three">
                <div className="container">
                    <div className="axil-team-grid-wrapper">
                        <SectionTitleTwo title="Gặp gỡ các tác giả xuất bản của chúng tôi" paragraph="Mọi nơi &amp; bất cứ khi nào bạn cần chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn - hãy liên hệ với chúng tôi nếu bạn có mọi nhu cầu hỗ trợ, dù đó là hỗ trợ kỹ thuật, thắc mắc chung hay hỗ trợ thông tin." />
                        <div className="row">
                            {AuthorList.slice(0, 6).map((data) => (
                                <div className="col-lg-4" key={data.slug}>
                                   <TeamOne data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne />
        </>
    );
}

export default AboutUs;


export async function getStaticProps() {

    const allPosts = getAllPosts([
        'slug',
        'title',
        'featureImg',
        'cate',
        'cate_bg',
        'author_name',
        'author_img',
        'author_desg',
        'author_social'
    ])

    const aboutData = getFileContentBySlug('AboutData', 'src/data/about')
    const content = await markdownToHtml(aboutData.content || "")
    return {
        props: {
            aboutData: {
                ...aboutData,
                content
            },
            allPosts
        }
    }
}





