import axios from 'axios';

export default async function fetchMenuData(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Handle API request
  try {
    const parentResponse = await axios.get('http://localhost:8080/api/v1/category/anonymous/get-all-parent');
    const parentCategories = parentResponse.data;

    const menuPromises = parentCategories.map(async (parent) => {
      const childResponse = await axios.get(`http://localhost:8080/api/v1/category/anonymous/get-child?categoryId=${parent.id}`);
      const childCategories = childResponse.data;

      return {
        label: parent.name,
        id:parent.id,
        path: "#",
        submenu: childCategories.map(child => ({
          sublabel: child.name,
          id: child.id,
          subpath: `/category/${child.id}`
        }))
      };
    });

    const menu = await Promise.all(menuPromises);
    res.status(200).json(menu);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
