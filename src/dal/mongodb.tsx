export async function findData(obj: any) {
  console.log('Database call disabled for deployment:', obj);
  
  // Return sample data based on collection name
  if (obj.co_name === 'reviews') {
    return [
      { name: 'John Smith', rating: 5, comment: 'Great service!' },
      { name: 'Sarah Jones', rating: 5, comment: 'Highly recommended!' }
    ];
  }
  
  if (obj.co_name === 'services') {
    return [
      { _id: '1', name: 'Residential Moving' },
      { _id: '2', name: 'Commercial Moving' }
    ];
  }
  
  return []; // Empty for other collections
}

// Add any other database functions that might exist
export async function insertData(obj: any) {
  console.log('Database insert disabled:', obj);
  return { success: true, message: "Database disabled for deployment" };
}

export async function updateData(obj: any) {
  console.log('Database update disabled:', obj);
  return { success: true, message: "Database disabled for deployment" };
}