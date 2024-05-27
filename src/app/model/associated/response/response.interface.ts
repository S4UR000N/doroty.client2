interface IResponseModel<T = {}> {
    result?: T;
    errors?: string[];
    success: boolean;
}

export default IResponseModel;