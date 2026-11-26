import API from "./Api";

export const addTransaction = (transactionData) => {
    return API.post("/v1/transaction/add", transactionData);
};

export const getTransactions = () => {
    return API.get("/v1/transaction/get");
};  