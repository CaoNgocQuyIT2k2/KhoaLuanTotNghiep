import axios from 'axios';

export default async function getReactData(req, res) {
  try {
    // Lấy articleId từ query params
    const { articleId } = req.query;
    console.log("articleId",articleId);
    // Tạo mảng các loại reaction
    const types = ['LIKE', 'HEART', 'CLAP', 'STAR'];
    
    // Tạo mảng các promise để gọi API cho từng loại reaction
    const promises = types.map(type => 
      axios.get(`http://localhost:8080/api/v1/react-emotion/anonymous/get-react-quantity?articleId=${articleId}&typeReact=${type}`)
    );
    
    // Gửi các request API song song và đợi tất cả các promise hoàn thành
    const responses = await Promise.all(promises);
    
    // Xử lý dữ liệu trả về từ mỗi response
    const data = responses.reduce((acc, response, index) => {
      const type = types[index];
      acc[type] = response.data;
      return acc;
    }, {});
    console.log("acc",responses);
    // Trả về dữ liệu dưới dạng JSON
    res.status(200).json(data);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching react data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
