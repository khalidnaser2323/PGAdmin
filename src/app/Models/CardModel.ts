export class CardModel {
    constructor(
        public title: string,
        public description: string,
        public imgUrl: File,
        public Templatebuttons: Array<string>,
    ) {

    }
}