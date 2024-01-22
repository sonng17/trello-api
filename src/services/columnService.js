import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    };
    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      //xu ly cau truc data trc khi tra du lieu ve
      getNewColumn.cards = [];

      //cap nhat mang columnOrderIds trong collection board
      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedColumn = await columnModel.update(columnId, updateData);

    return updatedColumn;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId);
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
    }

    //Xoa Column
    await columnModel.deleteOneById(columnId);
    //Xoa Cards trong Column
    await cardModel.deleteManyByColumnId(columnId);
    //Xoa columnId cua columnOrderIds cua Board
    await boardModel.pullColumnOrderIds(targetColumn);
    return { deleteResult: "Column and Cards deleted successfully!" };
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
  update,
  deleteItem,
};
