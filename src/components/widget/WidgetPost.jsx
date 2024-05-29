import { Tab, Nav  } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import PostDanTri from "../post/layout/PostDanTri";
import PostVNExpress from "../post/layout/PostVNExpress";
import PostLatestPer4Cat from "../post/layout/PostLatestPer4Cat";
import PostPqexpress from "../post/layout/PostPqexpress";


const WidgetPost = ({dataPost}) => {
    
  return (
    <div className="post-widget sidebar-post-widget m-b-xs-40">
        <Tab.Container id="widget-post" defaultActiveKey="recent">
            <Nav variant="pills" className="row no-gutters">
                <Nav.Item className="col">
                <Nav.Link eventKey="recent">PQEXPRESS</Nav.Link>
                </Nav.Item>
                <Nav.Item className="col">
                <Nav.Link eventKey="popular">Dân Trí</Nav.Link>
                </Nav.Item>
                <Nav.Item className="col">
                <Nav.Link eventKey="comments">VNExpress</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <Tab.Content>
                <Tab.Pane eventKey="recent">
                <PostPqexpress  pClass=""  />
                </Tab.Pane>
                <Tab.Pane eventKey="popular">
                    <PostDanTri  pClass=""  />
                </Tab.Pane>
                <Tab.Pane eventKey="comments">
                    <PostVNExpress  pClass="" />
                </Tab.Pane>
            </Tab.Content>
            
        </Tab.Container>
    </div>
  );
};

export default WidgetPost;
