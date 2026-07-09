import {
    AIFactory,
} from "./ai.factory.js";


import {
    AIError,
} from "./ai.error.js";


import type {

    AICompletionOptions,

    AIMessage,

} from "./ai.types.js";




export class AIService {



    static async generate(

        messages: AIMessage[],

        options?: AICompletionOptions

    ) {


        const provider =
            AIFactory.getProvider();



        const response =
            await provider.generate({

                messages,


                ...(options && {

                    options,

                }),


            });



        if(!response.content){

            throw new AIError(
                "AI failed to generate response"
            );

        }



        return response;

    }


}