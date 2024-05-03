import { StatusCodes } from "http-status-codes";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    };
    const createdCard = await cardModel.createNew(newCard);
    const getNewCard = await cardModel.findOneById(
      createdCard.insertedId
    );

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)

    }
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (cardId) => {
  try {
    const targetCard = await cardModel.findOneById(cardId);
    if (!targetCard) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
    }

    //Xoa Cards trong Column
    // await cardModel.deleteManyByColumnId(cardId);
    await cardModel.deleteOneById(cardId);

    return { deleteResult: "Cards deleted successfully!" };
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
  deleteItem
};
