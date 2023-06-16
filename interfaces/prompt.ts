export interface IPrompt {
    _id: string;
    creator: {
        _id: string
        email: string;
        image: string;
        username: string
    };
    prompt: string;
    tag: string;
}