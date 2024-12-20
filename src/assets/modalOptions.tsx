export type ModalItem = {
    id: number;
    name: string;
    link: string;
}

export const modalPresetPrompts: {
    Chinese: string,
    English: string
} = {
    Chinese: '请根据下面我给出的要求取5个名字，并给出相应的解释。你回答的所有字数不能超过200字。',
    English: 'Please come up with 5 names according to the requirements I have given below and give them the explanations accordingly. All your answers cannot exceed 200 words.',
}

export const modalOptions: ModalItem[] = [
    {
        id: 0,
        name: 'Jina Chat',
        link: 'https://chat.jina.ai/api'
    }
]