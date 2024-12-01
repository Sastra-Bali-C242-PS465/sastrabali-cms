export const handleError = (error: any) => {
  // Handle axios-specific error structure
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }

  // Fallback for other errors
  throw new Error(error.message || 'Terjadi kesalahan!');
};
