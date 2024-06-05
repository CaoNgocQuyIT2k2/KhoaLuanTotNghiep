import { Tab, Nav } from "react-bootstrap";
import PostDanTri from "../post/layout/PostDanTri";
import PostVNExpress from "../post/layout/PostVNExpress";

const WidgetPost = ({ dataPost }) => {
  return (
    <div className="post-widget sidebar-post-widget m-b-xs-40">
      <Tab.Container id="widget-post" defaultActiveKey="recent">
        <Nav variant="pills" className="row no-gutters">
          <Nav.Item className="col">
            <Nav.Link eventKey="recent">Dân Trí</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="comments">VNExpress</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="recent" mountOnEnter={false}>
            <PostDanTri pClass="" />
          </Tab.Pane>
          <Tab.Pane eventKey="comments" mountOnEnter={false}>
            <PostVNExpress pClass="" />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default WidgetPost;
