import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/ResotranNaJosanici');
    console.log('Connected to DB');
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export default connect
