export const loggerMiddleware = (store) => {
    return function(next){
        return function(action){
            console.log('[LOG]: '+action.type+" "+new Date().toString())
            next(action)
            // log the modified state of app
            console.log(store.getState())
        }
    }
}