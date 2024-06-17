import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import HeadMeta from "../../elements/HeadMeta";
import HeaderOne from "../../header/HeaderOne";
import Breadcrumb from "../../common/Breadcrumb";
import PostLayoutArtByCat from "./PostLayoutArtByCat";
import WidgetPost from "../../widget/WidgetPost";
import WidgetAd from "../../widget/WidgetAd";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import FooterOne from "../../footer/FooterOne";
import BackToTopButton from "../post-format/elements/BackToTopButton";
import { HIDE_SPINNER, SHOW_SPINNER } from "../../../../store/constants/spinner";
import { useDispatch } from "react-redux";


const LayoutArticlesByCategory = ({ allPosts }) => {
    const router = useRouter();
    const { categoryId } = router.query;
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (categoryId) {
                try {
                    dispatch({ type: SHOW_SPINNER });

                    const response = await axios.get(`/api/get-category-by-id?categoryId=${categoryId}`);
                    setData(response.data);
                    setTimeout(() => {
                        dispatch({ type: HIDE_SPINNER });
                    }, 3000);
                } catch (error) {
                    setTimeout(() => {
                        dispatch({ type: HIDE_SPINNER });
                        message.error(error.response?.data?.message);
                    }, 3000);
                }
            }
        };
        fetchData();
    }, [categoryId,dispatch]);

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

export default LayoutArticlesByCategory;
