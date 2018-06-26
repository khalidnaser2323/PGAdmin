export class Constants {
    public static BASE_URL: string = "http://206.189.96.67:3000/api/v1/";
    public static USER_DATA: string = "UserData";
    public static SELECTED_PILLAR: string = "SelectedPillar";
    public static IMAGE_PATH: string = "http://206.189.96.67:3000/api/v1/image/";
    public static APP_TEMPLATES: Array<TemplateModel> = [
        {
            tempId: "1",
            imageURL: "img/temp1.png"
        },
        {
            tempId: "2",
            imageURL: "img/temp2.png"
        }, {
            tempId: "3",
            imageURL: "img/temp3.png"
        }, {
            tempId: "4",
            imageURL: "img/temp4.png"
        }, {
            tempId: "5",
            imageURL: "img/temp5.png"
        }, {
            tempId: "6",
            imageURL: "img/temp6.png"
        }, {
            tempId: "7",
            imageURL: "img/temp7.png"
        }, {
            tempId: "8",
            imageURL: "img/temp8.png"
        }, {
            tempId: "9",
            imageURL: "img/temp9.png"
        },
        {
            tempId: "10",
            imageURL: "img/temp10.png"
        }, {
            tempId: "11",
            imageURL: "img/temp11.png"
        }, {
            tempId: "12",
            imageURL: "img/temp12.png"
        }
    ];
    public static guidGenerator(): string {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
}