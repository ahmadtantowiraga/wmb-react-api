import axiosInstance from '@/api/axiosInstance';

const CustomerService = () => {
    const create = async (payload) => {
        const { data } = await axiosInstance.post('/customers', payload);
        return data;
    }

    const getAll = async (query) => {
        const { data } = await axiosInstance.get(`/customers`, { params: query });
        return data;
    }

    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/customers/${id}`);
        return data;
    }

    const update = async (payload) => {
        const { data } = await axiosInstance.put('/customers', payload);
        return data;
    }

    const deleteById = async (id) => {
        const { data } = await axiosInstance.delete(`/menus/${id}`);
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

export default CustomerService;