/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";
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
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    // b1: clone board de xu ly
    const resBoard = cloneDeep(board);
    // b2: Dua card ve dung columns
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
      // column.cards = resBoard.cards.filter(
      //   (card) => card.columnId.toString() === column._id.toString()
      // );
    });

    // b3: xoa mang card khoi board ban dau
    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedBoard = await boardModel.update(boardId, updateData);

    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
    });

    return { updateResult: "Successfully !" };
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
};
