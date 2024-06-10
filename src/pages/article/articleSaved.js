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
import PostLayoutArtSaved from "../../components/post/layout/PostLayoutArtSaved";
import BackToTopButton from "../../components/post/post-format/elements/BackToTopButton";
import SavedArticle from "../../components/post/post-format/elements/SavedArticle";

const articleSaved = ({ allPosts }) => {
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



    return (
        <>

            <HeaderOne />

            
            <div className="body container">

            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="axil-content">
                                <SavedArticle postSizeMd={true} />
                            </div>
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

export default articleSaved;