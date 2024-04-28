import axiosInstance from '@/api/axiosInstance';

const TransactionTypeService = () => {
    const create = async (payload) => {
        const { data } = await axiosInstance.post('/transactionTypes', payload);
        return data;
    }

    const getAll = async (query) => {
        const { data } = await axiosInstance.get(`/transactionTypes`, { params: query });
        return data;
    }

    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/transactionTypes/${id}`);
        return data;
    }

    const update = async (payload) => {
        const { data } = await axiosInstance.put('/transactionTypes', payload);
        return data;
    }

    const deleteById = async (id) => {
        const { data } = await axiosInstance.delete(`/transactionTypes/${id}`);
        return data;
    }

    return {
        create,
        getAll,
        getById,
        update,
        deleteById,
    }
}

export default TransactionTypeService;