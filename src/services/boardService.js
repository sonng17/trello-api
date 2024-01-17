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

    // Trả kết quả về trong Service luôn phải có return
    return newBoard

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong db
    //...

    // Làm thêm các xử lý logic khác với các collection khác tùy đặc thù dự án ...vv

    // const createdBoard = await boardModel.createNew(newBoard);
    // console.log(createdBoard);
    // const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    // console.log(getNewBoard);

    // //tra ket qua ve, trong service luon phai co return
    // return getNewBoard;

  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
