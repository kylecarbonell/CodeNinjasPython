// const call = "http://localhost:8000";
const call = "https://codeninjaspython.onrender.com";

// const pythonCall = "http://127.0.0.1:5000";
const pythonCall = `https://codeninjaspythonserver.onrender.com`;

const getActivity = (name: string) => {
  return `https://dist-images.vercel.app/${name}.pdf#toolbar=0&navpanes=0`;
};

const getImage = (name: string) => {
  return `https://dist-images.vercel.app/${name}`;
};

export { call, pythonCall, getActivity, getImage };
