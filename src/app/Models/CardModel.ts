
interface CardModel {
    cardId: string,
    title: string,
    description: string,
    imageUrl: string,
    buttons: Array<{ buttonTitle: string, buttonTempId: string, buttonId: string }>
}