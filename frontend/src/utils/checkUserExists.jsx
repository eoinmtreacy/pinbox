
const checkUserExists = async (pinbox_id) => {
  try {
    const response = await fetch(`http://localhost:5165/User/get-user/${pinbox_id}`);
    if (response.status == 200) {

      return true;
    } else {

      return false;
    }
  } catch (error) {
    console.error('Failed to check user existence:', error);
    return false; 
  }
};

export default checkUserExists;