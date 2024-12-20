type Language = {
    nativeName: string;
}

type Languages = {
    [key: string]: Language;
}

const langs :Languages = {
    "en": {
        nativeName: "English"
    },
    "zh": {
        nativeName: "中文"
    }
};
export default langs;