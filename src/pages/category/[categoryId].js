import { getAllPosts } from "../../../lib/api";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import { slugify } from "../../utils";
import HeadMeta from "../../components/elements/HeadMeta";
import AdBanner from "../../components/common/AdBanner";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetCategory from "../../components/widget/WidgetCategory";
import PostLayoutArtByCat from "../../components/post/layout/PostLayoutArtByCat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BackToTopButton from "../../components/post/post-format/elements/BackToTopButton";

const PostCategory = ({ allPosts }) => {
    const router = useRouter();
    const { categoryId } = router.query;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (categoryId) {
                try {
                    const response = await axios.get(`/api/getCategoryById?categoryId=${categoryId}`);
                    setData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [categoryId]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HeadMeta metaTitle={data.name} />
            <HeaderOne />
            <Breadcrumb aPage={data.id} />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{data.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content">
                                <PostLayoutArtByCat categoryId={categoryId} postSizeMd={true} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetPost dataPost={allPosts} />
                                <WidgetAd />
                                <WidgetSocialShare />
                                <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne />
    <BackToTopButton />

        </>
    );
};

export default PostCategory;
