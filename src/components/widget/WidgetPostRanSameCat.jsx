import { Tab, Nav  } from "react-bootstrap";
import PostLatestPer4Cat from "../post/layout/PostLatestPer4Cat";
import PostRanArtByCat from "../post/layout/PostRanArtByCat";


const WidgetPostRanSameCat = ({dataPost}) => {
    console.log("dataPost",dataPost)
  return (
    <div className="post-widget sidebar-post-widget m-b-xs-40">
        <Tab.Container id="widget-post" defaultActiveKey="recent">
            <Nav variant="pills" className="row no-gutters">
                <Nav.Item className="col">
                <Nav.Link eventKey="recent">Bài viết liên quan</Nav.Link>
                </Nav.Item>

            </Nav>
            
            <Tab.Content>
                <Tab.Pane eventKey="recent">
                <PostRanArtByCat dataPost={dataPost}  pClass=""  />
                </Tab.Pane>
            </Tab.Content>
            
        </Tab.Container>
    </div>
  );
};

export default WidgetPostRanSameCat;
