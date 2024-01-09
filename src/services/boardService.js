import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
const createNew = async (reqBody) => {
  try {
    // Xu ly logic du lieu tuy dac thu du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    //tra ket qua ve, trong service luon phai co return
    return newBoard
  } catch (error) {
    // throw error
  }
};

export const boardService = {
  createNew,
};
