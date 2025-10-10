

const loggerMiddleware = (store) => (next) => (action) => {
   
    console.log('User Activity:', {
        actionType: action.type,
        payload: action.payload,
        timestamp: new Date().toISOString(),
    });
    
    
    return next(action);
};

export default loggerMiddleware;
