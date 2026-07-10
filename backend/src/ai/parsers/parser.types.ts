export interface AIParser<T> {

    parse(
        response: string,
    ): T;

}