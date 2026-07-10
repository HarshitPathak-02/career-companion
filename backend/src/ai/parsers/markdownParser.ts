export class MarkdownParser {

    static clean(

        content: string

    ): string {

        return content

            .replace(/```/g, "")

            .trim();

    }

}