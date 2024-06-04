import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { BsArrowBarLeft } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

const ViewDraftArticle = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const [articleData, setArticleData] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (article_id) {
            axios.get(`/api/getArtDetail?article_id=${article_id}`)
                .then(response => {
                    const data = response.data;
                    setArticleData(data);
                    form.setFieldsValue({
                        title: data.title,
                        abstracts: data.abstracts,
                        categoryName: data.category.name,
                        // tags: data.tags.map(tag => tag.value).join(", "),
                        content: data.content,
                    });
                })
                .catch(error => {
                    console.error("Error fetching article details:", error.message);
                });
        }
    }, [article_id, form]);

    return (
        <div
            style={{
                padding: "10px",
                margin: "auto",
                width: "1000px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "flex-start",}}>
                <h1 style={{ fontWeight: "600", fontSize: "20px", cursor: "pointer" , marginRight:"1rem" }}>
                    <Link href="/editor/EditorDashboard" className="back_home mr-5">
                        <BsArrowBarLeft />
                    </Link>

                </h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center",}}>
                <h1 style={{ fontWeight: "600", fontSize: "20px", cursor: "pointer" , marginRight:"1rem" }}>
                    <span className="ml-3">TỔNG QUAN BÀI VIẾT</span>
                </h1>
            </div>


            <Form
                form={form}
                className="container mt-5"
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 21,
                }}
                layout="horizontal"
                style={{
                    width: 900,
                }}
            >
                <Form.Item label="Tiêu đề" name="title">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Mô tả" name="abstracts">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Chuyên mục" name="categoryName">
                    <Input disabled />
                </Form.Item>
                {/* <Form.Item label="Thẻ" name="tags">
          <Input disabled />
        </Form.Item> */}
                <Form.Item label="Nội dung" name="content">
                    <div
                        style={{
                            height: "260px",
                            backgroundColor: "#f5f5f5",
                            padding: "10px",
                            borderRadius: "4px",
                            overflow: "auto",
                            whiteSpace: "pre-wrap"
                        }}
                        dangerouslySetInnerHTML={{ __html: form.getFieldValue("content") }}
                    />
                </Form.Item>
                <Form.Item
                    style={{ paddingTop: "30px" }}
                    label="Avatar"
                    name="file"
                >
                    {articleData && (
                        <img
                            src={articleData.avatar}
                            alt="Existing Image"
                            style={{ width: "100%" }}
                        />
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default ViewDraftArticle;
