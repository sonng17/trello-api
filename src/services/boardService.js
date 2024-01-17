/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong db
    const createdBoard = await boardModel.createNew(newBoard);
    // console.log(createdBoard);

    // Lấy bản ghi board sau khi gọi (tùy mục đích dự án mà có cần bước này hay k)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    // console.log(getNewBoard);
    
    // Làm thêm các xử lý logic khác với các collection khác tùy đặc thù dự án ...vv

    // Trả kết quả về trong Service luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
