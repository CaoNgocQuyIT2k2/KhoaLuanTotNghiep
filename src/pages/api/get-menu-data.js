import axios from 'axios';

export default async function handler(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle API request
  try {
    const parentResponse = await axios.get('http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/category/anonymous/get-all-parent');


    if (parentResponse.status !== 200) {
      throw new Error('Unexpected status code from API');
    }

    const parentCategories = parentResponse.data;

    const menuPromises = parentCategories.map(async (parent) => {
      const childResponse = await axios.get(`http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/category/anonymous/get-child?categoryId=${parent.id}`);


      if (childResponse.status !== 200) {
        throw new Error('Unexpected status code from API');
      }

      const childCategories = childResponse.data;

      return {
        label: parent.name,
        id: parent.id,
        path: "#",
        submenu: childCategories.map(child => ({
          sublabel: child.name,
          id: child.id,
          subpath: `/category/${child.id}`
        }))
      };
    });

    // Wait for all promises to resolve
    const menuData = await Promise.all(menuPromises);
    res.status(200).json(menuData);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
}
